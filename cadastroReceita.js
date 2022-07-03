const URLReceita = "https://receito-api.herokuapp.com/receita";


function closeClearDataModal(modalID){
    $(modalID).modal('hide');
    $(modalID).on('hidden.bs.modal', function (e) {
        $(this)
          .find("input,textarea,select")
             .val('')
             .end();
      })
}

function createReceita(){
    
    const receita = JSON.stringify({
        id: 0,
        nomeReceita: document.getElementById('cadastroNomeReceita').value,
        ingredientes: document.getElementById('cadastroIngredientes').value,
        modoPreparo: document.getElementById('cadastroModoPreparo').value,
        tempoPreparo: document.getElementById('cadastroTempoPreparo').value, 
        porcoes: document.getElementById('cadastroPorcoes').value,
        urlImg: document.getElementById('cadastroUrlImagem').value,
        categoria: document.getElementById('cadastroCategoria').value        
    })

        fetch(URLReceita, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: receita
        })
        .then(res => res.json())
        .then(() =>location.reload);

        closeClearDataModal('#cadastroReceita')
        alert("Cadastro realizado com sucesso!") 
}

function pesquisaNomeReceita(){
    const nomeReceitaDigitado = document.getElementById('nomeReceitaDigitado').value;
   

    //Quando o usuário não digitar nada
    if(nomeReceitaDigitado == ''){
        listarCards();
        return
    }


    fetch(URLReceita+'?nomeReceita='+nomeReceitaDigitado)
    .then(res => res.json())
    .then(receitas =>{
        let texto = '';

        for (i = 0; i < receitas.length; i++) {

            const value = receitas[i].id;
            const valueEncode = encodeURI(value);
            imagem = receitas[i].urlImg;
            nome = receitas[i].nomeReceita;
            link = 'pages/visualizarReceita.html?q='+valueEncode;

              texto +=
              `     <div class="col-lg-3 col-sm-8">
                        <a class="disabled-link" href="${link}">
                            <div class="receita">
                                <img src="${imagem}" style="text-decoration:none"
                                    class="img-fluid">
                                <div class="nomeReceita">
                                    <p>${nome}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;
        }
          $('.receitas').html(texto);
 
    }); 
}

function pesquisaIngredienteReceita(){
    var pai =  document.getElementById('tasks');
    var adicionar = [];

    for(var i = 0; i < pai.children.length; i++){
        adicionar.push(pai.children[i].children.taskname.innerText); 
    }

    console.log(adicionar.length);
    fetch(URLReceita)
    .then(res => res.json())
    .then(receitas =>{
        let texto = '';

        for (i = 0; i < receitas.length; i++) {
            if(adicionar.reduce((a,c) => a + receitas[i].ingredientes.includes(c), 0) == adicionar.length){

           

            const value = receitas[i].id;
            const valueEncode = encodeURI(value);
            imagem = receitas[i].urlImg;
            nome = receitas[i].nomeReceita;
            link = 'pages/visualizarReceita.html?q='+valueEncode;

              texto +=
              `     <div class="col-lg-3 col-sm-8">
                        <a class="disabled-link" href="${link}">
                            <div class="receita">
                                <img src="${imagem}" style="text-decoration:none"
                                    class="img-fluid">
                                <div class="nomeReceita">
                                    <p>${nome}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;
        }
          $('.receitas').html(texto);
        }
 
    }); 
}

function listarCards(){
    fetch(URLReceita)
    .then(res => res.json())
    .then(receitas =>{
        let texto = '';
        for (i = 0; i < receitas.length; i++) {

            const value = receitas[i].id;
            const valueEncode = encodeURI(value);
            imagem = receitas[i].urlImg;
            nome = receitas[i].nomeReceita;
            link = 'pages/visualizarReceita.html?q='+valueEncode;

              texto +=
              `     <div class="col-lg-3 col-sm-8">
                        <a class="disabled-link" href="${link}">
                            <div class="receita">
                                <img src="${imagem}" style="text-decoration:none"
                                    class="img-fluid">
                                <div class="nomeReceita">
                                    <p>${nome}</p>
                                </div>
                            </div>
                        </a>
                    </div>`;
        }
          $('.receitas').html(texto);
 
    }); 

}


$(document).ready(function () {
    listarCards();
  });