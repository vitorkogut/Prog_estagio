

const update = document.querySelector('#update-button')

update.addEventListener('click',function(_) { // espera pelo "click"
    
    fetch('/Produto', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            nome: 'Darth Vadar',
            marca: 'borracha',
            tamanho: '455'
        })
    })

})