const countrySelect = document.querySelector("#countrySelect")
const wrap = document.querySelector(".wrap")
const search = document.querySelector("#search")
const btnSearch = document.querySelector("#btnSearch")
const contenedorInfo = document.querySelector(".contenedorInfo")
const section = document.querySelector("#section")
const opciones = document.querySelector(".opciones")
const spinner = document.querySelector(".sk-folding-cube")

btnSearch.addEventListener("click", buscar)
countrySelect.addEventListener("change", buscarContinente)

window.onload = function inicio(){
    
    const url = "https://restcountries.com/v2/all"
    fetch(url)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        quitarSpinner()
        console.log(data)
        data.forEach(item =>{
            const {capital, flags, name, population, region, area} = item
            wrap.innerHTML += `
            <div class="contenedorInfo" onclick="infoSingle(${area})">
            <img class="bandera" src="${flags.svg}">
            <div class="descripcion">
                <h5>${name}</h5>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p><strong>Region:</strong> ${region}</p>
            </div>
        </div>`
        })
    })
    
}
function quitarSpinner(){
    remover()
}

function buscar(e){
    e.preventDefault()
    remover()
    const url = `https://restcountries.com/v2/name/${search.value}`
    fetch(url)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        data.forEach(item =>{
            console.log(item)
            const {capital, flags, name, population, region, area} = item
            wrap.innerHTML += `
            <div class="contenedorInfo" onclick="infoSingle(${area})">
            <img class="bandera" src="${flags.svg}">
            <div class="descripcion">
                <h5>${name}</h5>
                <p>Capital: ${capital}</p>
                <p>Population: ${population}</p>
                <p><strong>Region:</strong> ${region}</p>
            </div>
        </div>`
        })
        
    })
    

}

function buscarContinente(e){
    e.preventDefault()
    remover()
    const url = `https://restcountries.com/v3.1/region/${countrySelect.value}`
    fetch(url)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        data.map(item =>{
            const {name, flags, capital, region, population, area} = item
            console.log(item)
            wrap.innerHTML += `
            <div class="contenedorInfo" onclick="infoSingle(${area})">
            <img class="bandera" src="${flags.svg}">
            <div class="descripcion">
                <h4>${name.common}</h4>
                <p><strong>Capital:</strong> ${capital}</p>
                <p><strong>Population:</strong> ${population}</p>
                <p><strong>Region:</strong> ${region}</p>
            </div>
        </div>`
        })
    })
}
function remover(){
    while(wrap.firstChild){
        wrap.removeChild(wrap.firstChild)
    }
}
function ocultar(){
    opciones.classList.add("d-none")
}
function historyBack(){
    return location.reload()
}
function infoSingle(a){
    //wrap.classList.add("d-none")
    ocultar()
    remover()
    btnSearch.classList.add("d-none")
    search.classList.add("d-none")
    const url = `https://restcountries.com/v2/all`
    fetch(url)
    .then(response =>{
        return response.json()
    })
    .then(data =>{
        data.map(item =>{
            const {area, name, flags, capital, borders, population, region, nativeName, subregion, languages, topLevelDomain, currencies} = item
            
            if(area == a){
                section.innerHTML += `
                <div class="contenedorInfoGde">
                <img class="banderaGde" src="${flags.svg}">
                <div class="descripcionGde">
                    <div class="cajaDescripcion">
                        <div class="datos1">
                            <h5><strong>${name}</strong></h5>
                            <p>Native Name: ${nativeName}</p>
                            <p>Population: ${population}</p>
                            <p>Region: ${region}</p>
                            <p>Sub Region: ${subregion}</p>
                            <p>Capital: ${capital}</p>
                        </div>
                    </div>
                    <div class="borderCountries">
                        <p class="bc">Border Countries: </p>
                    </div>
                </div>
            </div>`
            const curr = []
            const langu = []
            const border = []
            currencies.map(item2 =>{
                curr.push(" " + item2.name)
            })
            languages.map(item3 =>{
                langu.push(" " + item3.name)
            })
            if(borders){
                borders.map(item4 =>{
                    border.push(item4)
                })
            }else{
                border.push("N/A")
            }
            const cajaDescripcion = document.querySelector(".cajaDescripcion")
            const borderCountries = document.querySelector(".borderCountries")
            const datos2 = document.createElement("div")
            
            datos2.classList.add("datos2")
            const p = document.createElement("p")
            const p2 =document.createElement("p")
            const curren = document.createTextNode(`Currencies: ${curr}`)
            const lang = document.createTextNode(`Languages: ${langu}`)

            
            

                p.appendChild(curren)
                p2.appendChild(lang)
                datos2.appendChild(p)
                datos2.appendChild(p2)
                cajaDescripcion.appendChild(datos2)
                
                border.forEach(item5 =>{
                    console.log(item5)
                    const btnBorder = document.createElement("button")
                    btnBorder.classList.add("btnCountries")
                    btnBorder.innerHTML = item5
                    borderCountries.appendChild(btnBorder)
                })
        }
    })
    const btnBack = document.createElement("button")
    btnBack.classList.add("btnBack")
    btnBack.innerHTML = "Back"
    opciones.insertAdjacentElement("afterend", btnBack)
    const backBtn = document.querySelector(".btnBack")
    backBtn.addEventListener("click", historyBack)
})
}