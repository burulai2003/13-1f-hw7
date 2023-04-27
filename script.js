const postsContainerEl =document.getElementById("posts-container")
const loaderEl =document.getElementById("loader")
const filterEl =document.getElementById("filter")



let limit = 10;
let page = 1;
let loaderIndicator = false;
let posts =[];



const renderItem =(post)=>{
    const {id,title,body}=post;
return`
<div class="post">
<div class="number">${id}</div>
<div class ="post_info">
<h2>${title}</h2>
<p class="post_body">${body}</p>
</div>
</div>`;

};
const getData = async()=>{
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
    const data =await response.json();
    page += 1 ;
    posts=[...posts,...data]

    return data;
   

  

};



const renderPosts =async()=>{
    loaderEl.classList.add("show");
    loaderIndicator=true;
   

    const data = await getData();

    let template = data.reduce((first,post)=>(first += renderItem(post)),"");
    postsContainerEl.innerHTML+=template;

    loaderEl.classList.remove("show");
    loaderIndicator=false;


};


const onWindowScroll =()=>{
    if(loaderIndicator){
        return;
    }
    const{scrollHeight, clientHeight, scrollTop,}=document.documentElement;

    if(scrollHeight <= clientHeight+1+scrollTop){
        renderPosts();


    }
}
const onSearch =(event)=>{

const term = event.target.value.toLowerCase();
const filteredPosts =posts.filter((el)=>`${el.title}${el.body}${el.id}`.toLowerCase().indexOf(term)> -1);
postsContainerEl.innerHTML = filteredPosts.reduce((first,post)=>(first += renderItem(post)),"");

}






renderPosts();

window.addEventListener("scroll",onWindowScroll);
filterEl.addEventListener("input",onSearch);
    