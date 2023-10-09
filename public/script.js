window.addEventListener('load', init)
async function init () {
    await load('city')
}
function optionSelected() {
    let tableName = document.querySelector('#taules').value
    load(tableName)
}
async function load(tableName) {
    // Agafar les referències
    refLoading = document.querySelector('#loading')
    refResults = document.querySelector('#results')

    // Preparar la visualització
    refLoading.style.display = 'block'
    refResults.style.display = 'none'

    // Preparar l'objecte que s'envia al servidor,
    // amb la petició de dades de la taula
    let requestData = {
        callType: 'tableData',
        table: tableName,
        limit: 10
    }
// Continua al següent quadre ... 
// ... continua del quadre anterior

    // Fer la petició al servidor
    let resultData = []
    try {
            let result = await fetch('/ajaxCall', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        })
    if (!result.ok) {
        throw new Error(`Error HTTP: ${result.status}`)
    }
    resultData = await result.json()
    } catch (e) {
        console.error('Error at "load":', e)
    }

    // Preparar la visualització
    refLoading.style.display = 'none'
    refResults.style.display = 'block'


// Continua a la següent diapositiva ... 
// ... continua de la diapositiva anterior

        // Mostrar les dades rebudes
        refResults.innerHTML = ''
        for (row in resultData) {
        let rowValue = resultData[row]
        let div = document.createElement('div')

        if (tableName == 'city'||tableName == 'country') {
            div.innerHTML = rowValue.Name
        } else {
            div.innerHTML = rowValue.Language
        }

        refResults.appendChild(div)
    }
}
