const kon = require('../service/dbset')
const logger = require('../service/logger')

function getListPenipu(callback) {
    kon.ekse("SELECT * from d_summary_penipu order by jumlah_pelapor limit 0,20", callback)
}

function insertDetail(body, callback) {
    var query = "insert into t_sms_penipu(msisdn_target,msisdn_pelapor,content,date_system,uploader,source) " +
        "values (${body.msisdn_target},${body.msisdn_pelapor},'${body.content}',NOW(),'${body.uploader}','${body.source}')"
    kon.ekse(query, callback)
}

function update_reference(body, callback) {
    var query = "update reference_penipu set status = '${body.status},updated_date = NOW(),updated_by='${body.updater} where " +
        "msisdn=${body.msisdn}"
}

function getReference(callback) {
    kon.ekse("select * from reference_penipu", callback)
}

function getDetail(msisdn, callback) {
    var query1 = `select destination as msisdn, 0 as pelapor, body as content, source, row_date as tanggal from sms_1166_trans where destination = ${msisdn}`
    logger.info(query1)
    kon.ekse(query1, callback)
}

function getDetail2(msisdn, callback) {
    var query1 = `select msisdn_target as msisdn, msisdn_pelapor as pelapor, content, source, date_system as tanggal from t_sms_penipu where msisdn_target = ${msisdn}`
    logger.info(query1)
    kon.ekse2(query1, callback)
}

module.exports = {
    getListPenipu,
    insertDetail,
    getReference,
    update_reference,
    getDetail,
    getDetail2
}