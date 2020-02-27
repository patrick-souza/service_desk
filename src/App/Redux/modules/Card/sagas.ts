import { fork, all, takeLatest, put, call, select } from 'redux-saga/effects';
import { notification } from 'antd';
import API from 'App/Services/Api';
import endpoints from 'Config/endpoints';
import {
  format_cpf,
  format_cnpj,
  formatDate,
  formatCurrency,
  formatNumber,
} from 'App/Util/format';
import history from 'App/Util/history';
import { IReducerAction, IApplicationState } from '..';
import {
  fetchCardsSuccess,
  cardsError,
  loadCharacteristics,
  updateCardContactless,
} from './actions';
import {
  CardsActionTypes,
  ICard,
  Pagination,
  ICardsPagination,
  IStatusCard,
} from './types';

function* handleFilter(): Generator {
  const activeFilter = (yield select(
    (state: IApplicationState) => state.card.activeFilter
  )) as IStatusCard;

  const typeFilter = {
    A: 'ACTIVE',
    P: 'INITIAL_BLOCK',
    B: 'BLOCKED',
    C: 'CANCELED',
    T: '',
  };

  if (activeFilter !== 'T') return `&filter=${typeFilter[activeFilter]}`;

  return '';
}
function* handleCardCodes(cardCodes?: string[]): Generator {
  if (cardCodes && cardCodes.length > 0) return cardCodes.join(',');

  return yield select((state: IApplicationState) =>
    state.search.result.map(r => r.card_code).join(',')
  );
}
function* fetchCards(action: IReducerAction<Pagination>): Generator {
  try {
    const { payload } = action;

    const cardCodes = (yield handleCardCodes(payload.cardCodes)) as string;

    const page = payload.page === undefined ? 1 : payload.page;

    const rowsPerPage = 5;

    const filter = (yield handleFilter()) as string;

    const cardDetails = (yield call(
      API.get,
      `${endpoints.telaunica_api}/cards/details?codeCards=${cardCodes}&page=${page}&rowsPerPage=${rowsPerPage}${filter}`
    )) as ICardsPagination;

    const rows: ICard[] = cardDetails.rows.map(card => ({
      ...card,
      formatted_balance: formatCurrency(card.balance),
      formatted_cashback: formatCurrency(card.cashback),
      documentType: card.document.length === 11 ? 'CPF' : 'CNPJ',
      formatted_document:
        card.document.length === 11
          ? format_cpf(card.document)
          : format_cnpj(card.document),
      formatted_expiration_date: formatDate(card.expiration_date, 'MM/YYYY'),
    }));

    yield put(
      fetchCardsSuccess({
        ...cardDetails,
        rows: [...rows],
      })
    );
  } catch (error) {
    yield put(cardsError());
  }
}

function* handleContactless(action: IReducerAction<string>): Generator {
  try {
    notification.destroy();
    const card = (yield select((state: IApplicationState) =>
      state.card.cards.find(({ card_code }) => card_code === action.payload)
    )) as ICard;

    if (!card.contactless) {
      return;
    }

    const response = (yield call(
      API.put,
      `${endpoints.telaunica_api}/cards/${action.payload}/contactless`,
      { status: !card.contactless.status }
    )) as { message: string };

    notification.success({ message: 'Sucesso', description: response.message });
    yield put(updateCardContactless(action.payload));
  } catch (error) {
    yield put(cardsError());
  }
}

function* handleCharacteristics(action: IReducerAction<string>): Generator {
  try {
    const cardCode = action.payload;
    const card = (yield select((state: IApplicationState) =>
      state.card.cards.find(({ card_code }) => card_code === cardCode)
    )) as ICard;

    if (card) {
      const formattedCharacteristics = card.card_specifications.characteristics.map(
        characteristic => ({
          ...characteristic,
          formatted_value:
            characteristic.type === 'Monetary'
              ? formatCurrency(+characteristic.value)
              : characteristic.type === 'Numeric'
              ? formatNumber(+characteristic.value)
              : characteristic.value,
        })
      );
      yield put(loadCharacteristics(formattedCharacteristics));
    }
  } catch (error) {
    console.log(error);
  }
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(CardsActionTypes.FETCH_CARDS, fetchCards),
    takeLatest(
      CardsActionTypes.SHOW_DIALOG_CHARACTERISTICS,
      handleCharacteristics
    ),
    takeLatest(CardsActionTypes.TOGGLE_ACTIVE_FILTER, fetchCards),
    takeLatest(CardsActionTypes.TOGGLE_CONTACTLESS, handleContactless),
  ]);
}

function handleCardsCache(action: IReducerAction<IApplicationState>): void {
  if (process.env.NODE_ENV === 'development') {
    return;
  }
  if (
    action.payload &&
    !action.payload.card &&
    ['/bearer', '/extract'].includes(history.location.pathname)
  )
    history.push('/dashboard');
}

export function* cardsSaga(): Generator {
  yield all([
    fork(watchFetchRequest),
    takeLatest('persist/REHYDRATE', handleCardsCache),
  ]);
}
