//когда страница полностью загрузится

window.addEventListener("load",function(){
  hSlide();
}); 

//******************************************************
function hSlide()
{
    var hiders=document.getElementsByClassName("hider");        //возвращает указатель массив элементов в классе hider 
    
    for (var i=0; i<hiders.length;i++)
    {
        hiders[i].children[0].style.marginLeft="0px";               //установка для элементов stars сдвиг слева 0px
        hiders[i].children[0].style.transition="margin-left  0.5s  cubic-bezier(0, 0.5, 0.5, 1)"; 

        hiders[i].addEventListener("mousedown",startDragging);      //установка события на каждый эл-т по надатии мышкой
        
        hiders[i].addEventListener("mouseup",function(){            //при отпускании мышии
            this.removeEventListener("mousemove",dragging);         //удаляем функцию dragging (как свойство)
        });  
        
        hiders[i].ondragstart=function()        //отключает возможность перетаскивания изображения куда-либо на ПК
        {
            return false;
        }; 
    } 
} 

function startDragging(event)
{
    if (this.offsetWidth < this.children[0].offsetWidth)        //если э-ты не помещаются в класс контейнера hider, тогда срабатывает блок кода
    {
        this.touchPos=event.pageX;          //св-во текущее положение мыши (первый щелчек с зажатием)
        this.oldObjPos=parseInt(this.children[0].style.marginLeft); //св-во положение мыши при отпускании (отпускание мыши после премешения)
        
        this.addEventListener("mousemove",dragging);
    } 

} 

//обработчик события mousemove - при смещении мыши
function dragging(event)
{
    var shift=event.pageX-this.touchPos; 
    var newObjPos=this.oldObjPos+shift;
                    //console.log("newObjPos=", newObjPos);
    
    //ограниечние по перемещению (чтобы stars не выходили за пределы hider при прогручивании)
    if (newObjPos<(this.offsetWidth-this.children[0].offsetWidth))
    {
        newObjPos=this.offsetWidth-this.children[0].offsetWidth;
    } 
    else if(newObjPos>0)
    {
      newObjPos=0;
    } 


    this.children[0].style.marginLeft=newObjPos+"px";           //изменение положения объекта

} 

