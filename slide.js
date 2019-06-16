window.addEventListener("load",function(){
	hSlide();
});

function hSlide()
{
	var action=mouseTouch();
	var hiders=document.getElementsByClassName('hider');

	for (var i=0; i<hiders.length;i++)
	{

		hiderSides(hiders[i]);

		hiders[i].children[0].style.marginLeft='0px';
		hiders[i].children[0].style.transition='margin-left 0.5s cubic-bezier(0, 0.5, 0.5, 1)';

		hiders[i].addEventListener(action.start,startDragging);

		hiders[i].addEventListener(action.end,function(){
			this.removeEventListener(action.drag,dragging);
			enableLinks();
		});
		

		hiders[i].ondragstart=function()              //запрещает перетаскивать произвольно картинки (к примеру на раб.стол)
		{
      		return false;
    	};
	}

}

function startDragging(event)
{
	if (this.offsetWidth<this.children[0].offsetWidth)
	{
		var action=mouseTouch();
		this.touchPos=event.pageX;
		this.oldObjPos=parseInt(this.children[0].style.marginLeft);

		this.addEventListener(action.drag,dragging);

	}
}

function dragging(event)
{
	disableLinks();

	var shift=event.pageX-this.touchPos;
	var newObjPos=this.oldObjPos+shift;

	if (newObjPos<(this.offsetWidth-this.children[0].offsetWidth))
	{
		newObjPos=this.offsetWidth-this.children[0].offsetWidth;
		this.querySelector('#hider-left').style.display='block';
		this.querySelector('#hider-right').style.display='none';
	}

	else if(newObjPos>0)
	{
		newObjPos=0;
		this.querySelector('#hider-left').style.display='none';
		this.querySelector('#hider-right').style.display='block';
	}
	else
	{
		this.querySelector('#hider-left').style.display='block';
		this.querySelector('#hider-right').style.display='block';
	}

	this.children[0].style.marginLeft=newObjPos+'px';

	clearSelection();
}

function mouseTouch()
{
	var obj;

	var supportsTouch = ('ontouchstart' in document.documentElement);

	if (supportsTouch===true)
	{
		return obj={start:'touchstart',drag:'touchmove',end:'touchend'};
	}
	else
	{
		return obj={start:'mousedown',drag:'mousemove',end:'mouseup'}
	}
	
}

function clearSelection() 
{
	if (window.getSelection) 
	{
		window.getSelection().removeAllRanges();
	} 
	else 
	{ // IE
		document.selection.empty();
	}
}

function createHiderSide(obj,position)
{
	var elem=document.createElement('div');
	elem.style.position='absolute';
	elem.style.width='30px';
	elem.style.height='100%';
	elem.style.top='0';
	if (position==='left')
	{
		elem.style.left='0';
		elem.style.display='none';
		elem.style.background=' linear-gradient(to right, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)';
	}
	else
	{
		elem.style.right='0';
		elem.style.background=' linear-gradient(to left, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%)';
		if (obj.offsetWidth>=obj.children[0].offsetWidth)
		{
			elem.style.display='none';
		}
	}
	
	elem.id='hider'+'-'+position;

	obj.appendChild(elem);
}

function hiderSides(obj)
{
	obj.style.position='relative';
	
	createHiderSide(obj,'left');
	createHiderSide(obj,'right');
}

function disableLinks()
{
	var links=document.getElementsByTagName('A');
	for (var i=0; i<links.length; i++)
	{
		links[i].style.pointerEvents='none';
	}
}

function enableLinks()
{
	var links=document.getElementsByTagName('A');
	for (var i=0; i<links.length; i++)
	{
		links[i].style.pointerEvents='auto';
	}
}	

/*окончание готового кола*/




