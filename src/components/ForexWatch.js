import useRequest from "../utils/useRequest";
import React, { useRef } from "react";
import getToday from "../utils/getToday";
import "./ForexWatch.css";

const first = 'https://www.chinamoney.com.cn/ags/ms/cm-u-bk-ccpr/CcprHisNew?startDate=2022-12-01&endDate=2023-01-11&currency=USD/CNY&pageNum=1&pageSize=10';
const second = 'https://www.chinamoney.com.cn/r/cms/www/chinamoney/data/fx/ccpr.json?t=';
const tmp = 'https://datacenter-web.eastmoney.com/api/data/v1/get?callback=datatable8092257&reportName=RPT_IMP_INTRESTRATEN&columns=REPORT_DATE%2CREPORT_PERIOD%2CIR_RATE%2CCHANGE_RATE%2CINDICATOR_ID%2CLATEST_RECORD%2CMARKET%2CMARKET_CODE%2CCURRENCY%2CCURRENCY_CODE&filter=(MARKET_CODE="003")(CURRENCY_CODE="GBP")(INDICATOR_ID="001")&pageNumber=1&pageSize=20&sortTypes=-1&sortColumns=REPORT_DATE'
const tmp2 ='https://vip.stock.finance.sina.com.cn/forex/api/jsonp.php/var%20_fx_susdcnh_1_1673425502873=/NewForexService.getMinKline?symbol=fx_susdcnh&scale=1&datalen=1';


export default function ForexWatch() {
    
    // hist
    const histUrl = 'https://www.chinamoney.com.cn/ags/ms/cm-u-bk-ccpr/CcprHisNew?endDate=' + getToday() + '&currency=USD%2FCNY%2CHKD%2FCNY%2CAUD%2FCNY&pageNum=1&pageSize=10';
    const { data: histData, status: histStatus, loaded: histLoaded } = useRequest(histUrl, 'get', {});
    
    var histContent = (
        <div>

            <div className="current">
                <div className="section_title">1、人民币汇率中间价(最新)载入中...</div>
            </div>

            <div className="hist">
                <div className="section_title">2、人民币汇率中间价(历史)载入中...</div>
            </div>
        </div>
    )
    if (histLoaded && histStatus == 200) {
        const histRecords = histData.records.slice(0, 7);
        histContent = (
            <div>

                <div className="current">
                    <div className="section_title">人民币汇率中间价(最新)</div>
                    <div className="blocks">
                        <div className="block">
                            <div className="block_title">USD/CNY</div>
                            <div className="block_main_text">{histRecords[0]['values'][0]}</div>
                            <div className="block_date">{histRecords[0]['date']}</div>
                        </div>

                        <div className="block">
                            <div className="block_title">HKD/CNY</div>
                            <div className="block_main_text">{histRecords[0]['values'][1]}</div>
                            <div className="block_date">{histRecords[0]['date']}</div>
                        </div>

                        <div className="block">
                            <div className="block_title">AUD/CNY</div>
                            <div className="block_main_text">{histRecords[0]['values'][2]}</div>
                            <div className="block_date">{histRecords[0]['date']}</div>
                        </div>
                    </div>


                </div>

                <div className="hist">
                    <div className="section_title">人民币汇率中间价(历史)</div>
                    <div className="blocks">
                        {
                            histRecords.reverse().map((item, index)=>(<div key={index} className="block">
                                <div className="block_title">USD/CNY</div>
                                <div className="block_main_text">{item['values'][0]}</div>
                                <div className="block_date">{item['date']}</div>
                            </div>))
                        }
                    </div>

                </div>
            </div>

        )
    }

    // const liborUrl = 'https://www.global-rates.com/en/interest-rates/libor/libor.aspx';
    // const { data: liborData, status: liborStatus, loaded: liborLoaded } = useRequest(liborUrl, 'get', {});
    // if (liborLoaded && liborStatus == 200) {
    //     console.log(liborData)
    // }

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
            <div className="block">
                <div className="block_title">{liborRecordsON[0]['CURRENCY_CODE']}</div>
                <div className="block_main_text">{liborRecordsON[0]['IR_RATE']}</div>
                {/* <div className="block_date">{liborRecordsON[0]['REPORT_DATE'].slice(0,11)}</div> */}
                <div className="block_date">{liborRecordsON[0]['REPORT_PERIOD']}</div>
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
            <div className="block">
                <div className="block_title">{liborRecords1M[0]['CURRENCY_CODE']}</div>
                <div className="block_main_text">{liborRecords1M[0]['IR_RATE']}</div>
                {/* <div className="block_date">{liborRecords1M[0]['REPORT_DATE'].slice(0,11)}</div> */}
                <div className="block_date">{liborRecords1M[0]['REPORT_PERIOD']}</div>
            </div>
        );
    }

    var liborContent = (
        <div className="libor">
            <div className="section_title">3、Libor报价载入中...</div>
        </div>
    )

    if (liborLoadedON && liborStatusON == 200 && liborLoaded1M && liborStatus1M == 200) {
        liborContent = (
            <div className="libor">
                <div className="section_title">Libor报价</div>
                <div className="blocks">
                    { liborONContent }
                    { libor1MContent }
                </div>
            </div>
        )
    }



    // offshore
    const offUrl = 'https://push2.eastmoney.com/api/qt/stock/get?invt=2&fltt=1&fields=f43%2Cf57%2Cf58&secid=133.USDCNH';
    const { data: offData, status: offStatus, loaded: offLoaded } = useRequest(offUrl, 'get');
    var offContent = (
        <div className="off">
            <div className="section_title">4、离岸人民币香港载入中...</div>
        </div>
    );
    if (offLoaded && offStatus == 200) {
        var offRecords = offData.data;
        offContent = (
            <div className="off">
                <div className="section_title">离岸人民币香港</div>
                <div className="blocks">
                    <div className="block">
                        <div className="block_title">{offRecords['f57']}</div>
                        <div className="block_main_text">{offRecords['f43'] / 10000}</div>
                        <div className="block_date">{offRecords['f58']}</div>
                    </div>
                </div>
            </div>
        );
    }

    var loadingContent = <div className="section_title">提示：若长期未显示可尝试刷新。</div>
    if (offLoaded && offStatus == 200 
        && liborLoadedON && liborStatusON == 200 
        && liborLoaded1M && liborStatus1M == 200 
        && liborLoadedON && liborStatusON == 200
    ) {
        loadingContent = <div></div>
    }

    return (
        <div className="forex_main">
            <div className="forex_title">今日外汇信息汇总</div>
            <div className="forex_content">
                { histContent }
                { liborContent }
                { offContent }
                { loadingContent }
            </div>
        </div>
    )
}