var express = require('express');
var apiRoutes = express.Router(); 
var app = express();
const sqlUtil = require('./mssql')
const sql = require('mssql')


 


apiRoutes.put('/update/:leadid', function(req, res) {
    
    console.log(req.body)
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






function validateUpdateLead(newLead, LeadID)
{
    const param = [
        { name: 'p_guid',type: sql.VarChar(150), value: LeadID},
        { name: 'p_p_contact_name',type: sql.VarChar(150), value: newLead.p_contact_name},
        { name: 'p_p_contact_bday',type: sql.VarChar(10), value: newLead.p_contact_bday},
        { name: 'p_p_contact_mobile',type: sql.VarChar(20), value: newLead.p_contact_mobile},
        { name: 'p_p_contact_email',type: sql.VarChar(200), value: newLead.p_contact_email},
       
     
    ]
    return param
}




  module.exports = apiRoutes;