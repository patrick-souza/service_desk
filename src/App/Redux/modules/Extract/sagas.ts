import { all, fork, takeLatest, call, put, select } from 'redux-saga/effects';
import {
  ExtractActionTypes,
  IExtract,
  Pagination,
  FilterPerDate,
} from './types';
import { IReducerAction, IApplicationState } from '..';
import { fetchExtractSuccess, fetchExtractError } from './actions';
import { formatDate, formatCurrency } from 'App/Util/format';
import endpoints from 'Config/endpoints';
import API from 'App/Services/Api';

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

export function* handleExtract(
  action: IReducerAction<Pagination & FilterPerDate>
): Generator {
  try {
    const payload = action.payload;

    const start_date = payload.start_date
      ? formatDate(payload.start_date, 'YYYY-MM-DD')
      : '';
    const end_date = payload.end_date
      ? formatDate(payload.end_date, 'YYYY-MM-DD')
      : '';

    let filterPerDate = '';
    if (start_date && end_date)
      filterPerDate = `&start_date=${start_date}&end_date=${end_date}`;

    const page = payload.page === undefined ? 1 : payload.page + 1;
    const rowsPerPage = payload.rowsPerPage || 5;
    const cardCode = yield payload.cardCode
      ? payload.cardCode
      : select((state: IApplicationState) => {
          const code = state.extract.cardCode;
          return code;
        });

    const url = `${endpoints.telaunica_api}/extract?card_code=${cardCode}&page=${page}&rowsPerPage=${rowsPerPage}${filterPerDate}`;
    const response = (yield call(API.get, url)) as {
      rows: any[];
      count: number;
    };

    const extract: IExtract[] = translateExtract(response);

    yield put(fetchExtractSuccess({ rows: extract, count: response.count }));
  } catch (error) {
    yield put(fetchExtractError());
  }
}

function* watchFetchRequest(): Generator {
  yield all([
    takeLatest(ExtractActionTypes.FETCH, handleExtract),
    takeLatest(ExtractActionTypes.UPDATE_CARD_CODE, handleExtract),
  ]);
}

export function* extractSaga(): Generator {
  yield all([fork(watchFetchRequest)]);
}
