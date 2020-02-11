import { fork, all, takeLatest, put, call, select } from 'redux-saga/effects';
import {
  CardsActionTypes,
  ICard,
  FilterByState,
  Pagination,
  ICardsPagination,
} from './types';
import { fetchCardsSuccess, cardsError, loadCharacteristics } from './actions';
import { IReducerAction, IApplicationState } from '..';
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

function* fetchCards(
  action: IReducerAction<Pagination & FilterByState>
): Generator {
  try {
    const payload = action.payload;

    const cardCodes = yield payload.cardCodes
      ? payload.cardCodes.join(',')
      : select((state: IApplicationState) =>
          state.search.result.map(r => r.card_code).join(',')
        );
    console.log(cardCodes);

    const page = payload.page === undefined ? 1 : payload.page;
    const rowsPerPage = payload.rowsPerPage || 5;

    const typeFilter = {
      A: 'ACTIVE',
      P: 'INITIAL_BLOCK',
      B: 'BLOCKED',
      C: 'CANCELED',
      T: '',
    };

    let filter = '';
    if (payload.state !== 'T') filter = `&filter=${typeFilter[payload.state]}`;

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

function* handleCharacteristics(action: IReducerAction<number>): Generator {
  try {
    const cardCode = action.payload;
    const card = (yield select((state: IApplicationState) =>
      state.card.cards.find(card => card.card_code === cardCode)
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
  } catch (error) {}
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(CardsActionTypes.FETCH_CARDS, fetchCards),
    takeLatest(
      CardsActionTypes.SHOW_DIALOG_CHARACTERISTICS,
      handleCharacteristics
    ),
  ]);
}

function handleCardsCache(action: IReducerAction<IApplicationState>): void {
  if (process.env.NODE_ENV === 'development') {
    return;
  } else
    action.payload &&
      !action.payload.card &&
      ['/bearer', '/extract'].includes(history.location.pathname);
  history.push('/dashboard');
}

export function* cardsSaga(): Generator {
  yield all([
    fork(watchFetchRequest),
    takeLatest('persist/REHYDRATE', handleCardsCache),
  ]);
}
