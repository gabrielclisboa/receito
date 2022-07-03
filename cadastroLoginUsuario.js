const URLUsuario = "https://receito-api.herokuapp.com/usuario";

function verificaEmail(email, emailBD){
    if(email == emailBD){
        return true;
    }
    return false;
}

function verificaSenha(password, passwordBD){
    if(password  == passwordBD){
        return true;
    }
    return false;
}

function closeClearDataModal(modalID){
    $(modalID).modal('hide');
    $(modalID).on('hidden.bs.modal', function (e) {
        $(this)
          .find("input,textarea,select")
             .val('')
             .end();
      })
}

function usuarioLogado(nomeUsuario){
    document.getElementById('botaoCadastroReceita').style.visibility ="visible";
    document.getElementById('botaoLogin').style.visibility ="hidden";
    document.getElementById('botaoCadastroUsuario').style.visibility ="hidden";
    document.getElementById('infoUser').style.visibility ="visible";
    document.getElementById('nomeUserLogado').innerHTML = "Olá "+nomeUsuario;
    closeClearDataModal('#loginUsuario')
    document.cookie = nomeUsuario;
}



function loginUser(){

    let nomeUsuario;
    fetch(URLUsuario)
    .then(res => res.json())
    .then(usuario =>{
        let emailLogin = document.getElementById('emailLogin').value;
        let senhaLogin = document.getElementById('senhaLogin').value;
        senhaLogin.toString;

        var validadorEmail = new Boolean ();
        var validadorSenha = new Boolean();
        
        for(i = 0; i<usuario.length; i++){            
            validadorEmail = (verificaEmail(emailLogin, usuario[i].email));
            validadorSenha = (verificaSenha(senhaLogin, usuario[i].senha));
            if(validadorEmail && validadorSenha){
                nomeUsuario = usuario[i].nome;
                break;
            }                        
        }

        if(validadorEmail && validadorSenha ){
            usuarioLogado(nomeUsuario);
        }else{
            alert("Login invalido");
        } 
    }); 
}



//POST Cadastro de usuarios
function createUser(){
    
    const usuario = JSON.stringify({
        id:0,
        nome: document.getElementById('nome').value,
        email: document.getElementById('email').value,
        senha: document.getElementById('senhaCadastro').value       
    })

    const senhaConfirmacao = document.getElementById('confirmacaoSenha').value;
    const senhaCadastro= document.getElementById('senhaCadastro').value;

    if(senhaCadastro== senhaConfirmacao){
        fetch(URLUsuario, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: usuario
        })
        .then(res => res.json())
        .then(() =>location.reload);

        closeClearDataModal('#cadastroUsuario')
        alert("Cadastro realizado com sucesso!") 
    }else{
        alert("Senha diferente da senha de confimação. Digite novamente") 
    }
}
