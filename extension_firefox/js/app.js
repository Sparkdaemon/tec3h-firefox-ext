// --------------------------------------------------------------------------
// Init
chrome.contextMenus.removeAll();


/* Trigger when new tab opened */
chrome.tabs.onCreated.addListener(function () {
  tec3h_commercebox_bo_commande_vo_precopy();
  tec3h_ddecertificatsituation_precopy();
});

/**
* Menu
*
*/
chrome.contextMenus.create({
  "id": "Tec3h",
  "title": "Tec3h",
  "contexts": ["page"],
  "onclick": function() {}
});


/* Demande de certificat de situation */
chrome.contextMenus.create({
  title: "Demande de certificat de situation (Copier depuis Tec3h)",
  parentId: "Tec3h",
  contexts:["page"],
  onclick: tec3h_ddecertificatsituation_copy
});

chrome.contextMenus.create({
  title: "Demande de certificat de situation (Remplir)",
  parentId: "Tec3h",
  contexts:["page"],
  onclick: tec3h_ddecertificatsituation_form_fill
});




/* CommerceBox */
chrome.contextMenus.create({
  title: "CommerceBox (Copier depuis Tec3h)",
  parentId: "Tec3h",
  contexts:["page"],
  onclick: tec3h_commercebox_bo_commande_vo_copy
});

chrome.contextMenus.create({
  title: "CommerceBox (Remplir)",
  parentId: "Tec3h",
  contexts:["page"],
  onclick: tec3h_commercebox_form_fill
});







// --------------------------------------------------------------------------
// Function

function tec3h_ddecertificatsituation_precopy()
{
  // The callback function can be named at the place of null
  chrome.tabs.query({}, function(tabs) {
    
    var url_to_match = "tec3h.com/tec3h/app/front/objpage/cgi/routeur.php?p_2ifmk_controleur=ObjVehicule";
    
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var tab_title = tab.title;
        var tab_url = tab.url;
        
        if (tab_url.indexOf(url_to_match) != -1 )
        {
          
          chrome.tabs.executeScript(tab.id, {
            code: 'document.getElementById("vo_infos").value;'
            }, process_code_result);
          }      
          
        }
    
    });
 }



// --------------------------------------------------------------------------
// Function

function tec3h_commercebox_bo_commande_vo_precopy()
{
  // The callback function can be named at the place of null
  chrome.tabs.query({}, function(tabs) {
    
    var url_to_match = "tec3h.com/tec3h/app/front/objpage/";
    
    /*
    tabs.forEach( function(tab){
      tab_title = tab.title;
      alert(tab_title);
    });
    */
    
    for (var i = 0; i < tabs.length; i++) {
        var tab = tabs[i];
        var tab_title = tab.title;
        var tab_url = tab.url;
        
        if (tab_url.indexOf(url_to_match) != -1 )
        {
          
          chrome.tabs.executeScript(tab.id, {
            code: 'document.getElementById("vo_infos").value;'
            }, process_code_result);
          }      
          
        }
    
    });
 }




// --------------------------------------------------------------------------
// Function

function tec3h_ddecertificatsituation_copy()
{
  // The callback function can be named at the place of null
  chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
    var tab = tabs[0];
    tab_title = tab.title;
    chrome.tabs.executeScript(tab.id, {
      code: 'document.getElementById("vo_infos").value;'
    }, process_code_result);
   });
}


// --------------------------------------------------------------------------
// Function

function tec3h_ddecertificatsituation_form_fill()
{
  chrome.storage.local.get(['field1'], function(result) {
    var val1 = result["field1"];
    tec3h_ddecertificatsituation_fill(val1);
  });
}


// --------------------------------------------------------------------------
// Function
function tec3h_ddecertificatsituation_fill(result)
{
  var vo_json = JSON.parse(result);

  var vo_immatriculation = vo_json.immatriculation;
  var vo_date_mec = vo_json.date_mec;
  var vo_date_carte_grise = vo_json.date_carte_grise;
  var vo_nom_prenom = vo_json.nom_prenom;
  var vo_societe = vo_json.societe;
  
  chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
    var tab = tabs[0];
    tab_title = tab.title;
    chrome.tabs.executeScript(tab.id, {
      code: 'document.getElementById("rechercheDossier.numeroImmatriculation").value = "'+vo_immatriculation+'";  document.getElementById("rechercheDossier.datePremImmat").value = "'+vo_date_mec+'"; document.getElementById("rechercheDossier.dateCi").value = "'+vo_date_carte_grise+'"; document.getElementById("rechercheDossier.nomEtPrenom").value = "'+vo_nom_prenom+'"; document.getElementById("rechercheDossier.raisonSociale").value = "'+vo_societe+'";'
    }, null);
  });
}

// rechercheDossier.dateCi



// --------------------------------------------------------------------------
// Function

function tec3h_commercebox_bo_commande_vo_copy()
{
  // The callback function can be named at the place of null
  chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
    var tab = tabs[0];
    tab_title = tab.title;
    chrome.tabs.executeScript(tab.id, {
      code: 'document.getElementById("vo_infos").value;'
    }, process_code_result);
   });
}

// --------------------------------------------------------------------------
// Function

function tec3h_commercebox_form_fill()
{
  chrome.storage.local.get(['field1'], function(result) {
    var val1 = result["field1"];
    tec3h_commercebox_fill(val1);
  });
}

// --------------------------------------------------------------------------
// Function

function process_code_result (result){

  chrome.storage.local.set({"field1": result}, function() {
        // console.log('Value is set to ' + result);
  });
}


// --------------------------------------------------------------------------
// Event Extension Popup Copy
var btn_copy = document.getElementById("btn_copy");
btn_copy.onclick = function() {
  tec3h_commercebox_bo_commande_vo_copy();
};


// --------------------------------------------------------------------------
// Event Extension Popup Paste
var btn_paste = document.getElementById("btn_paste");
btn_paste.onclick = function() {
  tec3h_commercebox_form_fill();
};




// --------------------------------------------------------------------------
// Function
function tec3h_commercebox_fill(result)
{
  var vo_json = JSON.parse(result);

  var vo_modele = vo_json.modele;
  var vo_immatriculation = vo_json.immatriculation;
  var vo_vin = vo_json.vin;
  var vo_energie = vo_json.energie;
  var vo_id_marque = vo_json.id_marque;
  var vo_date_mec = vo_json.date_mec;
  var vo_couleur = vo_json.couleur;
  var vo_version = vo_json.version;
  var vo_boitevitesse = vo_json.boitevitesse;
  var vo_km = vo_json.km;
  var vo_km_garanti = vo_json.km_garanti;
  var vo_co2 = vo_json.co2;
  var vo_prixht = vo_json.prixht;
  var vo_puissance_fiscale = vo_json.puissance_fiscale;
  var vo_cylindree = vo_json.cylindree;
  var vo_equipement1 = vo_json.equipement1;
  var vo_equipement2 = vo_json.equipement2;
  var vo_equipement3 = vo_json.equipement3;
  var vo_equipement4 = vo_json.equipement4;
  var vo_equipement5 = vo_json.equipement5;
  var vo_equipement6 = vo_json.equipement6;
  var vo_equipement7 = vo_json.equipement7;
  var vo_equipement8 = vo_json.equipement8;
  var vo_equipement9 = vo_json.equipement9;
  var vo_equipement10 = vo_json.equipement10;

  if (vo_km_garanti) vo_km_garanti = true;
  else vo_km_garanti = false;

  chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
    var tab = tabs[0];
    tab_title = tab.title;
    chrome.tabs.executeScript(tab.id, {
      code: 'document.getElementById("vo_kilometros_garantizados").checked = '+vo_km_garanti+';  document.getElementById("vo_cilindrada").value = "'+vo_cylindree+'"; document.getElementById("vo_potencia").value = "'+vo_puissance_fiscale+'"; document.getElementById("voEnergiaId").value = "'+vo_energie+'"; document.getElementById("voPrincipalesEquipamientos10").value = "'+vo_equipement10+'"; document.getElementById("voPrincipalesEquipamientos9").value = "'+vo_equipement9+'"; document.getElementById("voPrincipalesEquipamientos8").value = "'+vo_equipement8+'"; document.getElementById("voPrincipalesEquipamientos7").value = "'+vo_equipement7+'"; document.getElementById("voPrincipalesEquipamientos6").value = "'+vo_equipement6+'"; document.getElementById("voPrincipalesEquipamientos5").value = "'+vo_equipement5+'"; document.getElementById("voPrincipalesEquipamientos4").value = "'+vo_equipement4+'"; document.getElementById("voPrincipalesEquipamientos3").value = "'+vo_equipement3+'"; document.getElementById("voPrincipalesEquipamientos2").value = "'+vo_equipement2+'"; document.getElementById("voPrincipalesEquipamientos1").value = "'+vo_equipement1+'"; document.getElementById("voPrecioHt").value = "'+vo_prixht+'"; document.getElementById("voCo2").value = "'+vo_co2+'"; document.getElementById("vo_Numkm").value = "'+vo_km+'"; document.getElementById("voCajaCambios").value = "'+vo_boitevitesse+'"; document.getElementById("libellyVersion").value = "'+vo_version+'"; document.getElementById("vo_color").value = "'+vo_couleur+'"; document.getElementById("vo_Primeramatricula").value = "'+vo_date_mec+'"; document.getElementById("voComboOrigenVehiculo").value = "Ex-Loueur"; document.getElementById("voGenero").value = "VP"; document.getElementById("vo_numvin").value = "'+vo_vin+'"; document.getElementById("libellyModelo").value = "'+vo_modele+'"; document.getElementById("vo_matricula").value = "'+vo_immatriculation+'"; document.getElementById("vo_Marca").value = "'+vo_id_marque+'";'
    }, null);
  });
}

/* To add in code

vo_kilometros_garantizados
// 

boGarantia // Un select, ex: "Premium#12#GENERICO#2"

*/

/* Other possibilities

// Add listener
chrome.contextMenus.onClicked.addListener(function () {
  //alert(3);
})
*/
