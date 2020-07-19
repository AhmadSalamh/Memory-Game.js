let controlSpan=document.querySelector('.control-button span'),
    spanName=document.querySelector('.name span'),
    duration=1000,//الوقت الذي يحتاجه الكرت من الجل الدوران
    blocksContainer=document.querySelector('.memory-game-blocks'),//العنصر الذي يحتوي على جميع العناصر
    blocks=Array.from(blocksContainer.children),//عملنا مصفوفة من العناصر
    orderRang=[...Array(blocks.length).keys()];//مجال من القيم من 0الى 19


controlSpan.onclick=function(){

let youName=prompt('Whats Your Name','your name');

if(youName=='your name'||youName==null){

    spanName.innerHTML='unKnown'
    
} else{

    spanName.innerHTML=youName
}   
document.querySelector('.control-button').remove();

}
shuffle(orderRang);

blocks.forEach((block,index)=>{
    
    block.style.order=orderRang[index];


    block.addEventListener('click',function(){
        
        flipBlock(block);

        let allFlippedBlocks=blocks.filter(flippedBlock=> flippedBlock.classList.contains('isflipped'));

        if(allFlippedBlocks.length==2){

            stopClicking()

            checkMatchBlocks(allFlippedBlocks[0],allFlippedBlocks[1])
        }
    })
})

function shuffle(array){//تابع عشوائي يغير من توزع عناصر المصفوفه في كل مرة

    let current =array.length,
    temp,
    random;
    while(current > 0){
        random=Math.floor(Math.random()* current)

        current--;

        temp=array[current];
        array[current]=array[random]
        array[random]=temp

    }
    return array
}

function flipBlock(selectedBlock){
    selectedBlock.classList.add('isflipped')
}

function stopClicking(){

    blocksContainer.classList.add('no-clicking');

    setTimeout(()=>{

        blocksContainer.classList.remove('no-clicking');

    },duration)
}

function checkMatchBlocks(fristBlock,secondBlock){

    let triesElement=document.querySelector('.tries span');

    if(fristBlock.dataset.technology==secondBlock.dataset.technology){

        fristBlock.classList.remove('isflipped');
        secondBlock.classList.remove('isflipped');

        fristBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        // document.getElementById('success').play()

    }else{
        triesElement.innerHTML =parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            
            fristBlock.classList.remove('isflipped');
            secondBlock.classList.remove('isflipped');

        }, duration);
        // document.getElementById('fail').play()

    }
}
