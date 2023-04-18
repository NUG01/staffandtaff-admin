function Load(){
    document.querySelector('body').style.opacity = '0.7'
    document.querySelector('body').style.pointerEvents = 'none'
}

function RemoveLoader(){
    document.querySelector('body').style.opacity = '1'
    document.querySelector('body').style.pointerEvents = 'unset'
}

export {Load, RemoveLoader}