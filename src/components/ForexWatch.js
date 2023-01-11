import useRequest from "../utils/useRequest";
import React, { useRef } from "react";

const first = 'https://www.chinamoney.com.cn/ags/ms/cm-u-bk-ccpr/CcprHisNew?startDate=2022-12-01&endDate=2023-01-11&currency=USD/CNY&pageNum=1&pageSize=10';
const second = 'https://www.chinamoney.com.cn/r/cms/www/chinamoney/data/fx/ccpr.json?t=';
const tmp = 'https://datacenter-web.eastmoney.com/api/data/v1/get?callback=datatable8092257&reportName=RPT_IMP_INTRESTRATEN&columns=REPORT_DATE%2CREPORT_PERIOD%2CIR_RATE%2CCHANGE_RATE%2CINDICATOR_ID%2CLATEST_RECORD%2CMARKET%2CMARKET_CODE%2CCURRENCY%2CCURRENCY_CODE&filter=(MARKET_CODE="003")(CURRENCY_CODE="GBP")(INDICATOR_ID="001")&pageNumber=1&pageSize=20&sortTypes=-1&sortColumns=REPORT_DATE'
const tmp2 ='https://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/var%20_fx_susdcnh_1_1673425502873=/NewForexService.getMinKline?symbol=fx_susdcnh&scale=1&datalen=1';

function decoNum(numString) {
    if(numString.length < 2) {
        return '-0' + numString
    } else {
        return '-' + numString;
    }
}

function getToday() {
    var todayInDate = new Date();
    return todayInDate.getFullYear().toString() + 
        decoNum((todayInDate.getMonth() + 1).toString()) + 
        decoNum(todayInDate.getDate().toString());
}

export default function ForexReader() {
    
    // hist
    const histUrl = 'https://www.chinamoney.com.cn/ags/ms/cm-u-bk-ccpr/CcprHisNew?endDate=' + getToday() + '&currency=USD%2FCNY%2CHKD%2FCNY%2CAUD%2FCNY&pageNum=1&pageSize=10';
    const { data: histData, status: histStatus, loaded: histLoaded } = useRequest(histUrl, 'get', {});
    if (histLoaded && histStatus == 200) {
        const histRecords = histData.records.slice(0, 7);
        var histContent = (
            <div>
                <div className="hist">
                    {
                        histRecords.map((item, index)=>(<div key={index}>
                            <div className="hist_date">{item['date']}</div>
                            <div className="hist_price">{item['values'][0]}</div>
                        </div>))
                    }
                </div>
                <div className="current">
                    <div className="current_date">{histRecords[0]['date']}</div>
                    <div className="current_type">USD/CNY</div>
                    <div className="current_price">{histRecords[0]['values'][0]}</div>
                    <div className="current_type">USD/HKD</div>
                    <div className="current_price">{histRecords[0]['values'][1]}</div>
                    <div className="current_type">USD/AUD</div>
                    <div className="current_price">{histRecords[0]['values'][2]}</div>
                </div>
            </div>

        )
    }

    // exchange rate
    const eastMoneyUrl = 'https://datacenter-web.eastmoney.com/api/data/v1/get';
    const { data: liborDataON, status: liborStatusON, loaded: liborLoadedON } = useRequest(eastMoneyUrl, 'get', {
        pageNumber: 1,
        sortColumns: 'REPORT_DATE',
        sortTypes: -1,
        pageSize: 10,
        reportName: 'RPT_IMP_INTRESTRATEN',
        columns: 'REPORT_DATE,REPORT_PERIOD,IR_RATE,CHANGE_RATE,INDICATOR_ID,LATEST_RECORD,MARKET,MARKET_CODE,CURRENCY,CURRENCY_CODE',
        filter: '(MARKET_CODE="003")(CURRENCY_CODE="USD")(INDICATOR_ID="001")',
    });
    if (liborLoadedON && liborStatusON == 200) {
        const liborRecordsON = liborDataON.result.data;
        var liborONContent = (
            <div>
                <div className="libor_date">{liborRecordsON[0]['REPORT_DATE'].slice(0,11)}</div>
                <div className="libor_type">{liborRecordsON[0]['REPORT_PERIOD']}</div>
                <div className="libor_currency">{liborRecordsON[0]['CURRENCY_CODE']}</div>
                <div className="libor_rate">{liborRecordsON[0]['IR_RATE']}</div>
            </div>
        );
    }

    const { data: liborData1M, status: liborStatus1M, loaded: liborLoaded1M } = useRequest(eastMoneyUrl, 'get', {
        pageNumber: 1,
        sortColumns: 'REPORT_DATE',
        sortTypes: -1,
        pageSize: 10,
        reportName: 'RPT_IMP_INTRESTRATEN',
        columns: 'REPORT_DATE,REPORT_PERIOD,IR_RATE,CHANGE_RATE,INDICATOR_ID,LATEST_RECORD,MARKET,MARKET_CODE,CURRENCY,CURRENCY_CODE',
        filter: '(MARKET_CODE="003")(CURRENCY_CODE="USD")(INDICATOR_ID="201")',
    });
    if (liborLoaded1M && liborStatus1M == 200) {
        const liborRecords1M = liborData1M.result.data;
        var libor1MContent = (
            <div>
                <div className="libor_date">{liborRecords1M[0]['REPORT_DATE'].slice(0,11)}</div>
                <div className="libor_type">{liborRecords1M[0]['REPORT_PERIOD']}</div>
                <div className="libor_currency">{liborRecords1M[0]['CURRENCY_CODE']}</div>
                <div className="libor_rate">{liborRecords1M[0]['IR_RATE']}</div>
            </div>
        );
    }

    var liborContent = (
        <div className="libor">
            { liborONContent }
            { libor1MContent }
        </div>
    )

    // offshore
    const offUrl = 'http://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=1&fields=f43%2Cf57%2Cf58&secid=133.USDCNH';
    const { data: offData, status: offStatus, loaded: offLoaded } = useRequest(offUrl, 'get');
    if (offLoaded && offStatus == 200) {
        console.log(offData);
        var offContent = (
            <div className="off">
            </div>
        );
    }

    return (
        <div className>
            {histContent}
            {liborContent}
        </div>
    )
}