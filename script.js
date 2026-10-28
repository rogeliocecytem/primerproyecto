const menu_hamburgueza = document.getElementById("logo-hamb")
const menu_hamburgueza_cerrar=document.getElementById("logo-hamb-cerrar")
const navegacionCel=document.querySelector(".header-navegacion")
menu_hamburgueza.addEventListener("click",()=>{
   
    navegacionCel.classList.toggle("active")
})

menu_hamburgueza_cerrar.addEventListener("click",()=>{
    navegacionCel.classList.toggle("active")

})

function inicializar_slider(root,{autoplay=6000}={}){
    const track=root.querySelector(".hero-track")
    const slides=Array.from(track.children)
    const total=slides.length
    let index=0
    let minutero=null

    function renderizar(){
    track.style.transform=`translateX(-${index * 100}%)`
    
    }

    function goTo(siguienteIndex){
        index=(siguienteIndex + total)% total
        renderizar()
        restaurarAtoplay()
    }

    function siguiente(){
        goTo(index + 1)
    }
    function anterior(){
        goTo(index - 1)
    
    }

    
    function iniciarAutoplay(){
        stopAutoplay()
        minutero=setInterval(siguiente,autoplay)
    }
    function stopAutoplay(){
        clearInterval(minutero)
    }
    function restaurarAtoplay(){
        iniciarAutoplay()
    }

    root.querySelectorAll("#btn-anterior").forEach((btn)=> btn.addEventListener("click",anterior))

     root.querySelectorAll("#btn-siguiente").forEach((btn)=> btn.addEventListener("click",siguiente))

    renderizar()
    iniciarAutoplay()

}

document.querySelectorAll(".hero-home").forEach((el)=>{
   inicializar_slider(el,{autoplay:6000})
})

const pista = document.getElementById("pista")
const ventana = document.getElementById("ventana")
const reproductor=document.getElementById("reproductor")


const paso=()=> pista.querySelector(".item").offsetWidth + 16

document.querySelector(".anterior").addEventListener("click",()=>pista.scrollBy({left: -paso()}))

document.querySelector(".siguiente").addEventListener("click",()=>pista.scrollBy({left: paso()}))


pista.querySelectorAll(".item").forEach((item)=>{
    item.addEventListener("click", ()=>{
        reproductor.src = item.dataset.src
        ventana.showModal()
        reproductor.play().catch(()=>{})
    })
})

function cerrar(){
    ventana.close()

}
document.getElementById("cerrar").addEventListener("click",cerrar)
ventana.addEventListener("click",(e)=>{
    if(e.target === ventana) cerrar()
})
ventana.addEventListener("close",()=>{
    reproductor.pause()
    reproductor.removeAttribute("src")
    reproductor.load()
})





