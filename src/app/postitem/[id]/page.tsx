// that api one is for routes while visting this routes what functions need to executes,
// whereas this page.tsc is to show what needs to render on page on clicking it, say something more close to
// HTML

"use client";

import React, { useState, useEffect, use } from "react";
import { initialPost, PostProps } from "@/sections/Posts";
import "./style.css";
import Image from "next/image";
import Preloader from "@/components/Preloader";
import SidePostItem from "@/components/SidePostItem";
import Link from "next/link";
import { useRouter } from "next/navigation";
// export default function PostItem({params}:{params:{id:string}}){

export default function PostItem({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params); // Unwrap params with use()
const router = useRouter();
  // const id: string=par;ams.id;
  const [item, setItem] = useState(initialPost);
  const [items, setItems] = useState([]);

  const tabsData = [
    { id: 1, name: "Popular", active: true },
    { id: 2, name: "TrendingPost", active: false },
  ];

  const [tabs, setTabs] = useState(tabsData);

  const handleTabActive = (id: number): void => {
    setTabs(
      tabsData.map((tab) => {
        tab.active = false;
        if (tab.id === id) tab.active = true;
        return tab;
      })
    );
  };

  const getSinglePostData = () => {
    fetch(`/api/postitem/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data))
      .catch((e) => console.log(e.message));
  };

  const getItemsData = () => {
    fetch(`/api/postitem`)
      .then((res) => res.json())
      .then((data) => setItems(data))
      .catch((e) => console.log(e.message));
  };

  const handleDeletePost = async (id:string)=>{
  try{
const response = await fetch(`/api/postitem/${id}`,{
  method:'DELETE',
  headers:{
    'Content-Type':'application/json',
  },
})

const result = response.status;
if(result === 200){

console.log("Success",result);
router.push(`/postitem`);}
  }

  catch(error){ 
console.log("error",error);
  }
  }
  useEffect(() => {
    getSinglePostData();
    getItemsData();
  }, []);
  return (
    <main id="main">
      <section className="single-post-content">
        <div className="container">
          <div className="row">
            <div className="col-md-9 post-content">
              {item && item.category !== "" ? (
                <div className="single-post">
                  <div className="post-meta">
                    <span className="date">{item.category}</span>
                    <span className="mx-1">
                      <i className="bi bi-dot"></i>
                    </span>
                    <span>
                      {" "}
                      {new Date(item.date).toLocaleDateString("en-US")}
                    </span>
                  </div>
                  <h1 className="mb-5">{item.title}</h1>
                  <p>
                    <span className="firstcharacter">
                      {item.brief && item.brief.charAt(0)}
                    </span>
                    {item.brief && item.brief.substring(1)}
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempora aspernatur totam soluta eos cum cupiditate excepturi
                    ipsum inventore, molestias quidem iste? Minima aperiam
                    corrupti error dolore quibusdam culpa sapiente cum?
                  </p>
                  <figure className="my-4">
                    {/* <Image
                      src={`/${item.img}`}
                      alt=""
                      className="img-fluid"
                      width={100}
                      height={100}
                      layout="responsive"
                    /> */}
                    <img src={`/${item.img}`} alt="" className="img-fluid" />
                    <figcaption>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    </figcaption>
                  </figure>
                  <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                    Earum ex quae soluta aspernatur sint vitae quidem laudantium
                    nostrum, culpa ullam sed quas, consectetur reiciendis optio
                    dolor, illo debitis nisi magnam.
                  </p>

                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Distinctio aperiam nobis asperiores dolore deleniti quidem
                    repudiandae incidunt aliquid, maxime, optio pariatur laborum
                    accusantium rerum? Voluptatum ab aperiam nisi rem ad.
                  </p>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Distinctio aperiam nobis asperiores dolore deleniti quidem
                    repudiandae incidunt aliquid, maxime, optio pariatur laborum
                    accusantium rerum? Voluptatum ab aperiam nisi rem ad.
                  </p> <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Distinctio aperiam nobis asperiores dolore deleniti quidem
                    repudiandae incidunt aliquid, maxime, optio pariatur laborum
                    accusantium rerum? Voluptatum ab aperiam nisi rem ad.
                  </p> <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Distinctio aperiam nobis asperiores dolore deleniti quidem
                    repudiandae incidunt aliquid, maxime, optio pariatur laborum
                    accusantium rerum? Voluptatum ab aperiam nisi rem ad.
                  </p>
                  <div className="d-flex justify-content-center gap-4">
                    <a className="btn btn-primary" onClick={()=>handleDeletePost(id)}>
                      <i className="bi bi-trash"></i>


                    </a>

                    <Link href={`/createpostitems/${id}`} className="btn btn-primary">
                   <i className="bi bi-pen"></i>
                    </Link>

                      
                  </div>
                </div>
              ) : (
                <Preloader />
              )}
            </div>
            <div className="col-md-3">
              <div className="aside-block">
                <ul className="nav nav-pills custom-tab-nav mb-4">
                  {tabs.map((tab) => (
                    <li className="nav-item" key={tab.id}>
                      <button
                        className={`nav-link ${
                          tab.active ? "active" : undefined
                        }`}
                        onClick={() => handleTabActive(tab.id)}
                      >
                        {" "}
                        {tab.name}
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="tab-content">
                  <div
                    className={`tab-pane fade ${
                      tabs[0].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(0, 6).map((items: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                  <div
                    className={`tab-pane fade ${
                      tabs[1].active ? "show active" : ""
                    }`}
                  >
                    {items.slice(6, 12).map((items: PostProps) => (
                      <SidePostItem key={item._id} item={item} />
                    ))}
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="aside-block">-</div>

                <div className="side-block">
                  <h3 className="aside-title">Video</h3>

                  <div className="video-post">
                    <a
                      target='https://www.youtube.com/watch?v=yiwCqFx6Z7Y&list=PPSV'
                      className="link-video"
                    >
                      <span className="bi-play-fill"></span>
                      <img
                        src="/assets/img/post-landscape-3.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
