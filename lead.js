var express = require('express');
var apiRoutes = express.Router(); 
var app = express();
const sqlUtil = require('../db/mssql')
const sql = require('mssql')

//Set Compatibility for Angular 


  apiRoutes.get('/', function(req, res) {
      console.log('Leads Root')
      res.json({ success: true }).status(200);
  })

  apiRoutes.post('/new', function(req, res) {
    console.log(req.body)
    
   
    var param = validateNewLead(req.body)   
    var promise = sqlUtil.storedProcedure(param,'sp_Leads_INS')
   
     
           promise.then((result) => 
            {
                console.log('LeadID:' + result.recordset[0].LeadId)
                res.json({ success: true, LeadID : result.recordset[0].LeadId }).status(200)  
            })
})


apiRoutes.get('/detail/:leadid', function(req, res) {
    const param = [{ name: 'p_guid',type: sql.VarChar(150), value: req.params.leadid}]
    var promise = sqlUtil.storedProcedure(param,'sp_Leads_SEL_by_GUID')
   
     
           promise.then((result) => 
            {
                console.log('LeadID:' + result.recordset[0].LeadId)
                res.json({ success: true, Data : result.recordset[0] }).status(200)  
            })

   
})



apiRoutes.put('/update/:leadid', function(req, res) {
    
    var param = validateUpdateLead(req.body, req.params.leadid)   
    var promise = sqlUtil.storedProcedure(param,'sp_Leads_UPD')
   
     
           promise.then((result) => 
            {
                console.log(result)
                console.log('LeadID:' + req.params.leadid + ' Updated - ' + result.rowsAffected[0] + ' Rows Effected')
                res.json({ success: true, RowsAffected : result.rowsAffected[0], UpdatedLeadID :req.params.leadid }).status(200)  
            })
            
            // .catch((error) => {
            //     console.log(error)
            //     res.json({ success: false, error: error }).status(400)
            //       
            //     })
            .catch(err => {
                //console.log('Error' + err)
                res.send({ error: err });
                });
           
})




apiRoutes.get('/list', function(req, res) {

    
    var param = validateListParm(req)   
    var promise = sqlUtil.storedProcedure(param,'sp_LeadList_SEL')
   
     
    promise.then((dbresult) => 
    {
       var  input = dbresult.recordset
       console.log(input)
      
        

       
       res.json(dbresult.recordsets);
    })
})



function validateNewLead(newLead)
{
    const param = [
        { name: 'p_p_contact_name',type: sql.VarChar(150), value: newLead.p_contact_name},
        { name: 'p_p_contact_first_name',type: sql.VarChar(50), value: newLead.p_contact_first_name},
        { name: 'p_p_contact_middle_name',type: sql.VarChar(50), value: newLead.p_contact_middle_name},
        { name: 'p_p_contact_last_name',type: sql.VarChar(50), value: newLead.p_contact_last_name},
        { name: 'p_p_contact_title',type: sql.VarChar(10), value: newLead.p_contact_title},
        { name: 'p_p_contact_suffix',type: sql.VarChar(15), value: newLead.p_contact_suffix},
        { name: 'p_p_contact_gender',type: sql.VarChar(1), value: newLead.p_contact_gender},

        { name: 'p_p_contact_bday',type: sql.VarChar(10), value: newLead.p_contact_bday},
        { name: 'p_p_contact_mobile',type: sql.VarChar(20), value: newLead.p_contact_mobile},
        { name: 'p_p_contact_home',type: sql.VarChar(20), value: newLead.p_contact_home},
        { name: 'p_p_contact_office',type: sql.VarChar(20), value: newLead.p_contact_office},
        { name: 'p_p_contact_email',type: sql.VarChar(200), value: newLead.p_contact_email},
        { name: 'p_p_contact_email_alternate',type: sql.VarChar(200), value: newLead.p_contact_email_alternate},
        { name: 'p_p_contact_job_title',type: sql.VarChar(50), value: newLead.p_contact_job_title},
        { name: 'p_p_contact_ocupation',type: sql.VarChar(50), value: newLead.p_contact_occupation},

        { name: 'p_s_contact_name',type: sql.VarChar(150), value: newLead.s_contact_name},
        { name: 'p_s_contact_first_name',type: sql.VarChar(50), value: newLead.s_contact_first_name},
        { name: 'p_s_contact_middle_name',type: sql.VarChar(50), value: newLead.s_contact_middle_name},
        { name: 'p_s_contact_last_name',type: sql.VarChar(50), value: newLead.s_contact_last_name},
        { name: 'p_s_contact_title',type: sql.VarChar(10), value: newLead.s_contact_title},
        { name: 'p_s_contact_suffix',type: sql.VarChar(15), value: newLead.s_contact_suffix},
        { name: 'p_s_contact_gender',type: sql.VarChar(1), value: newLead.s_contact_gender},

        { name: 'p_s_contact_bday',type: sql.VarChar(10), value: newLead.s_contact_bday},
        { name: 'p_s_contact_mobile',type: sql.VarChar(20), value: newLead.s_contact_mobile},
        { name: 'p_s_contact_home',type: sql.VarChar(20), value: newLead.s_contact_home},
        { name: 'p_s_contact_office',type: sql.VarChar(20), value: newLead.s_contact_office},
        { name: 'p_s_contact_email',type: sql.VarChar(200), value: newLead.s_contact_email},
        { name: 'p_s_contact_email_alternate',type: sql.VarChar(200), value: newLead.s_contact_email_alternate},
        { name: 'p_s_contact_job_title',type: sql.VarChar(50), value: newLead.s_contact_job_title},
        { name: 'p_s_contact_ocupation',type: sql.VarChar(50), value: newLead.s_contact_occupation},

        { name: 'p_home_street_address',type: sql.VarChar(50), value: newLead.home_street_address},
        { name: 'p_home_city',type: sql.VarChar(50), value: newLead.home_city},
        { name: 'p_home_state',type: sql.VarChar(50), value: newLead.home_state},
        { name: 'p_home_zip',type: sql.VarChar(50), value: newLead.home_zip},
        { name: 'p_home_country',type: sql.VarChar(50), value: newLead.home_country},

        { name: 'p_search_min_beds',type: sql.Float, value: validateInt(newLead.search_min_beds)},
        { name: 'p_search_min_baths',type: sql.Float, value: validateInt(newLead.search_min_baths)},
        { name: 'p_search_min_garage',type: sql.Float, value: validateInt(newLead.search_min_garage)},
        { name: 'p_search_pool',type: sql.Int, value: validateInt(newLead.search_pool)},
        { name: 'p_search_min_sq_ft',type: sql.Float, value: validateInt(newLead.search_min_sq_ft)},
        { name: 'p_search_storey',type: sql.Int, value: validateInt(newLead.search_storey)},
        { name: 'p_search_max_sqft',type: sql.Float, value: validateInt(newLead.search_max_sqft)},
        { name: 'p_search_min_lot_sqft',type: sql.Float, value: validateInt(newLead.search_min_lot_sqft)},
        { name: 'p_search_max_lot_sqft',type: sql.Float, value: validateInt(newLead.search_max_lot_sqft)},
        { name: 'p_search_min_year_build',type: sql.Int, value: validateInt(newLead.search_min_year_build)},
        { name: 'p_search_max_year_build',type: sql.Int, value: validateInt(newLead.search_max_year_build)},
        { name: 'p_created_by',type: sql.VarChar(50), value: 'tmpUserID'}
       
     
    ]
    return param
}

function validateUpdateLead(newLead, LeadID)
{
    const param = [
        { name: 'p_guid',type: sql.VarChar(150), value: LeadID},
        { name: 'p_p_contact_name',type: sql.VarChar(150), value: newLead.p_contact_name},
        { name: 'p_p_contact_first_name',type: sql.VarChar(50), value: newLead.p_contact_first_name},
        { name: 'p_p_contact_middle_name',type: sql.VarChar(50), value: newLead.p_contact_middle_name},
        { name: 'p_p_contact_last_name',type: sql.VarChar(50), value: newLead.p_contact_last_name},
        { name: 'p_p_contact_title',type: sql.VarChar(10), value: newLead.p_contact_title},
        { name: 'p_p_contact_suffix',type: sql.VarChar(15), value: newLead.p_contact_suffix},
        { name: 'p_p_contact_gender',type: sql.VarChar(1), value: newLead.p_contact_gender},

        { name: 'p_p_contact_bday',type: sql.VarChar(10), value: newLead.p_contact_bday},
        { name: 'p_p_contact_mobile',type: sql.VarChar(20), value: newLead.p_contact_mobile},
        { name: 'p_p_contact_home',type: sql.VarChar(20), value: newLead.p_contact_home},
        { name: 'p_p_contact_office',type: sql.VarChar(20), value: newLead.p_contact_office},
        { name: 'p_p_contact_email',type: sql.VarChar(200), value: newLead.p_contact_email},
        { name: 'p_p_contact_email_alternate',type: sql.VarChar(200), value: newLead.p_contact_email_alternate},
        { name: 'p_p_contact_job_title',type: sql.VarChar(50), value: newLead.p_contact_job_title},
        { name: 'p_p_contact_ocupation',type: sql.VarChar(50), value: newLead.p_contact_occupation},

        { name: 'p_s_contact_name',type: sql.VarChar(150), value: newLead.s_contact_name},
        { name: 'p_s_contact_first_name',type: sql.VarChar(50), value: newLead.s_contact_first_name},
        { name: 'p_s_contact_middle_name',type: sql.VarChar(50), value: newLead.s_contact_middle_name},
        { name: 'p_s_contact_last_name',type: sql.VarChar(50), value: newLead.s_contact_last_name},
        { name: 'p_s_contact_title',type: sql.VarChar(10), value: newLead.s_contact_title},
        { name: 'p_s_contact_suffix',type: sql.VarChar(15), value: newLead.s_contact_suffix},
        { name: 'p_s_contact_gender',type: sql.VarChar(1), value: newLead.s_contact_gender},

        { name: 'p_s_contact_bday',type: sql.VarChar(10), value: newLead.s_contact_bday},
        { name: 'p_s_contact_mobile',type: sql.VarChar(20), value: newLead.s_contact_mobile},
        { name: 'p_s_contact_home',type: sql.VarChar(20), value: newLead.s_contact_home},
        { name: 'p_s_contact_office',type: sql.VarChar(20), value: newLead.s_contact_office},
        { name: 'p_s_contact_email',type: sql.VarChar(200), value: newLead.s_contact_email},
        { name: 'p_s_contact_email_alternate',type: sql.VarChar(200), value: newLead.s_contact_email_alternate},
        { name: 'p_s_contact_job_title',type: sql.VarChar(50), value: newLead.s_contact_job_title},
        { name: 'p_s_contact_ocupation',type: sql.VarChar(50), value: newLead.s_contact_occupation},

        { name: 'p_home_street_address',type: sql.VarChar(50), value: newLead.home_street_address},
        { name: 'p_home_city',type: sql.VarChar(50), value: newLead.home_city},
        { name: 'p_home_state',type: sql.VarChar(50), value: newLead.home_state},
        { name: 'p_home_zip',type: sql.VarChar(50), value: newLead.home_zip},
        { name: 'p_home_country',type: sql.VarChar(50), value: newLead.home_country},

        { name: 'p_search_min_beds',type: sql.Float, value: validateInt(newLead.search_min_beds)},
        { name: 'p_search_min_baths',type: sql.Float, value: validateInt(newLead.search_min_baths)},
        { name: 'p_search_min_garage',type: sql.Float, value: validateInt(newLead.search_min_garage)},
        { name: 'p_search_pool',type: sql.Int, value: validateInt(newLead.search_pool)},
        { name: 'p_search_min_sq_ft',type: sql.Float, value: validateInt(newLead.search_min_sq_ft)},
        { name: 'p_search_storey',type: sql.Int, value: validateInt(newLead.search_storey)},
        { name: 'p_search_max_sqft',type: sql.Float, value: validateInt(newLead.search_max_sqft)},
        { name: 'p_search_min_lot_sqft',type: sql.Float, value: validateInt(newLead.search_min_lot_sqft)},
        { name: 'p_search_max_lot_sqft',type: sql.Float, value: validateInt(newLead.search_max_lot_sqft)},
        { name: 'p_search_min_year_build',type: sql.Int, value: validateInt(newLead.search_min_year_build)},
        { name: 'p_search_max_year_build',type: sql.Int, value: validateInt(newLead.search_max_year_build)},
        { name: 'p_updated_by',type: sql.VarChar(50), value: 'UpdateUserID'}
       
     
    ]
    return param
}

function validateListParm(req)
{
    if (!req.query.rowcount) {var t_rowcount = 10}
    else
    {var t_rowcount = req.query.rowcount}
    
    if (!req.query.offset) {var t_offset = 0}
    else
    {var t_offset = req.query.offset}
    
    if (!req.query.name) {var t_name = ''}
    else
    {var t_name = req.query.name}

    if (!req.query.phone) {var t_phone = ''}
    else
    {var t_phone = req.query.phone}

    if (!req.query.email) {var t_email = ''}
    else
    {var t_email = req.query.email}

    if (!req.query.city) {var t_city = ''}
    else
    {var t_city = req.query.city}

    

    const param =  [{ name: 'p_offset',type: sql.Int, value: t_offset * t_rowcount},
                    { name: 'p_nbrrows',type: sql.Int, value: t_rowcount},
                    { name: 'p_name',type: sql.VarChar, value: t_name},
                    { name: 'p_phone',type: sql.VarChar, value: t_phone},
                    { name: 'p_email',type: sql.VarChar, value: t_email},
                    { name: 'p_city',type: sql.VarChar, value: t_city}

                    ]

                    return param
}




function validateInt(tmpInt)
{
    if((tmpInt ==="") || (isNaN(tmpInt) == true ))
    {
        console.log('Will return null')
        return null
    }
    else
    {
        console.log('Will return ' + tmpInt)
        return tmpInt
    }
}

function validatePhone(tmpPhone)
{
    tmpPhone = tmpPhone.replace('(','')
    tmpPhone = tmpPhone.replace(')','')
    tmpPhone = tmpPhone.replace('-','')
    tmpPhone = tmpPhone.replace(' ','')

    return tmpPhone


}

  module.exports = apiRoutes;