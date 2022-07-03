const URLReceitaEdicao = "https://receito-api.herokuapp.com/receita/";

function onLoad() {
    const value = decodeURI(window.location.href.split('?q=')[1]);

    fetch(URLReceitaEdicao+value)
    .then(res => res.json())
    .then(receita =>{
        let texto = '';

        imagem = receita.urlImg;
        nome = receita.nomeReceita;
        ingredientes = receita.ingredientes;
        modoPreparo = receita.modoPreparo;
        tempoPreparo = receita.tempoPreparo;
        categoria= receita.categoria;
        porcoes= receita.porcoes;

        texto += `        
        <div class="row mt-2">
        
          <div class="col-12 mb-2">
              <span class="fs-2">${nome}</span>
          </div>
          <div class="col-lg-6 col-sm-12">
              <img style="width: 30rem;" src="${imagem}" class="img-fluid" alt="...">
          </div>
          <div class="col-lg-6 col-sm-12">
              <span class="text-center fs-3">Modo de Preparo</span>
              <div class="areaModoPreparo">
                <p>${modoPreparo}</p>
              </div>
          </div>
          <div class="col-sm-12 col-lg-6 mt-3">
              <span class="fs-3">Ingredientes</span>
              <div class="areaIngredientes">
                <p>${ingredientes}</p>
              </div>
          </div>
          <div class="col-sm-12 col-lg-6 mt-3">
             <span class="fs-3">Outras informações</span>
             <div class="areaIngredientes">
             <p><b>Categoria</b>: ${categoria}</p>
             <p><b>Tempo de Preparo: </b> ${tempoPreparo} minutos</p>
             <p><b>Quantidade de porções: </b>${porcoes}</p>
          </div>
      </div>

      </div>`.replace(/(\r\n|\r|\n)/g, '<br>');

                  
                  
        $('.receitaEdicao').html(texto);
        
    }); 

    
  }


  window.onload = function () {
    onLoad();
  }