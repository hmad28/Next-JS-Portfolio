// "use client"

export const dynamic = "force-dynamic";
export const revalidate = 0;

import React from "react";
import styles from "./slider_3d.module.css";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Avatar from "./Avatar";
import AvatarNoBG from "./Avatar-nobg";
import Viewer3D from "./Viewer3D";
// import dynamic from "next/dynamic";


export default function Slider3DPage() {
    
  const images = [
    "/images/slider_3d_1.jpg",
    "/images/slider_3d_2.jpg",
    "/images/slider_3d_3.jpg",
    "/images/hammad-bgRagunan-new.jpg",
    "/images/about7.jpeg",
    "/images/about6.jpg",
    "/images/about2.jpg",
    "/images/hammad-bridge.jpg",
    "/images/work.jpg",
    "/images/about3.jpg",
  ];

  return (
    <div className={styles.container}>
      <div className={styles.banner}>
        <div
          className={styles.slider}
          style={{ "--quantity": images.length } as React.CSSProperties}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className={styles.item}
              style={{ "--position": index + 1 } as React.CSSProperties}
            >
              <img src={img} alt={`Dragon ${index + 1}`} />
            </div>
          ))}
        </div>
        <div className={styles.content}>
          <h1 className={styles.title} data-content="ABOUT ME">
            ABOUT ME
          </h1>
          <div className={styles.author}>
            <h2>HAMMAD</h2>
            <p>
              <b>Web Developer</b>
            </p>
            <p>Subscribe to the channel to watch many interesting videos</p>
          </div>
          <div className={styles.model}>
            <Viewer3D />
          </div>
        </div>
      </div>

      {/* <Avatar /> */}
    </div>
  );
}
