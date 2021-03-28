'use strict';

// Make navbar transparent when it is on the top
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{

    if(window.scrollY > navbarHeight){
        navbar.classList.add('navbar--dark');
    }else{
        navbar.classList.remove('navbar--dark');
    }
});


//Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click',(event)=>{
    const target = event.target;
    const link = target.dataset.link;
    if(link==null){
        return;
    }
    console.log(event.target.dataset.link);
    navbarMenu.classList.remove('open');
    scrollIntoView(link);
})

//Navbar toggle button for small screen
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click',()=>{
navbarMenu.classList.toggle('open');
})

//handle click on "contact me" button on home
const contactBtn = document.querySelector('.home__contact');
contactBtn.addEventListener('click',(event)=>{
    const link = event.target.dataset.link;
    scrollIntoView(link);
})

//make home slowly fade to transparent as scrolled
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll',()=>{
    home.style.opacity=1 - window.scrollY/homeHeight;
})

//show 'arrow-up' when scrolled down
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll',()=>{
    if(window.scrollY>homeHeight/2){
        arrowUp.classList.add('visible');
    }else{
        arrowUp.classList.remove('visible');
    }
})

arrowUp.addEventListener('click',(event)=>{
    scrollIntoView('#home');
})

//Projects
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project'); //클래스 애들 모두 배열로 받아옴
workBtnContainer.addEventListener('click',(e)=>{
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    if(filter == null){
        return;
    } console.log(filter);
    
    //remove selection from the previouse item and select the new one
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    //클릭된게 버튼이면 그대로 e.target쓰고, 버튼아니라 숫자(span)눌렀을수도 있으니까 그럼 부모를써라
    const target = e.target.nodeName==='BUTTON' ? e.target: e.target.parentNode;
    target.classList.add('selected');



    projectContainer.classList.add('anim-out');
    // foreach함수가 원래 setTimeout()밖에 위에있었는데 안에 넣어서 0.3초뒤에 실행되서 움직임이 자연스럽게함
    setTimeout(()=>{
        projects.forEach((project)=>{
            console.log(project.dataset.type);
            if(filter=='*'|| filter==project.dataset.type){
                project.classList.remove('invisible');
            }else{
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    },300);
    
});

function scrollIntoView(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior:'smooth'});
}

