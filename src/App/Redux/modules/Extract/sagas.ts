import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';
import { formatDate, formatCurrency } from 'App/Util/format';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';
import { notification } from 'antd';
import {
  ExtractActionTypes,
  IExtract,
  Pagination,
  FilterPerDate,
} from './types';
import { IReducerAction, IApplicationState } from '..';
import { fetchExtractSuccess, fetchExtractError } from './actions';

function translateExtract(response: {
  rows: any[];
  count: number;
}): IExtract[] {
  return response.rows.map(e => {
    const transaction: IExtract = {
      trasactionCode: Number(e.codigoTransacao),
      cardCode: Number(e.codigoCartao),
      establishment: e.estabelecimento || '-',
      establishmentCode: Number(e.codigoEstabelecimento),
      authorizationDate: e.dataAutorizacao,
      formatted_authorizationDate:
        formatDate(e.dataAutorizacao, 'DD/MM/YYYY') || '-',
      situationCode: Number(e.codigoSituacao),
      typeSituationCode: Number(e.codigoTipoTransacao),
      value: e.valor || '-',
      formatted_value: formatCurrency(e.valor) || '-',
      acquirerCode: Number(e.codigoAdquirente),
      settlementDate: e.dataLiquidacao || '-',
      registrationDate: e.dataCadastro || '-',
      formatted_registrationDate:
        formatDate(e.dataCadastro, 'DD/MM/YYYY [-] HH:mm[h]') || '-',
      typeTransaction: {
        typeTransactionCode: Number(e.tiposTransacoes.codigoTipoTransacao),
        name: e.tiposTransacoes.nome || '-',
      },
      situationTransaction: {
        situationCode: Number(e.situacoesTransacoes.codigoSituacao),
        name: e.situacoesTransacoes.nome || '-',
      },
    };
    return transaction;
  });
}

function* handlefilterByDate(): Generator {
  const [start_date, end_date] = (yield select(
    (state: IApplicationState) => state.extract.filter
  )) as FilterPerDate;

  if (start_date && end_date) {
    return `&start_date=${start_date.format(
      'YYYY-MM-DD'
    )}&end_date=${end_date.format('YYYY-MM-DD')}`;
  }
  return '';
}

function* handleCardCode(cardCode?: string): Generator {
  if (cardCode) return cardCode;

  return yield select((state: IApplicationState) => state.extract.cardCode);
}
function* fetchExtract({ payload }: IReducerAction<Pagination>): Generator {
  try {
    const page = payload.page === undefined ? 1 : payload.page + 1;
    const rowsPerPage = 5;
    const cardCode = (yield handleCardCode(payload.cardCode)) as string;

    const filter = (yield handlefilterByDate()) as string;

    const url = `${endpoints.telaunica_api}/extract?card_code=${cardCode}&page=${page}&rowsPerPage=${rowsPerPage}${filter}`;
    const response = (yield call(API.get, url)) as {
      rows: IExtract[];
      count: number;
    };

    const extract: IExtract[] = translateExtract(response);

    yield put(fetchExtractSuccess({ rows: extract, count: response.count }));
  } catch (error) {
    notification.error({ message: 'Oops!', description: error.message });
    console.log(error);

    yield put(fetchExtractError());
  }
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(ExtractActionTypes.FETCH, fetchExtract),
    takeLatest(ExtractActionTypes.SET_ACTIVE_FILTER, fetchExtract),
    takeLatest(ExtractActionTypes.RESET_FILTER, fetchExtract),
  ]);
}

export default function* extractSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
