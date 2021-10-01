import "./Home.css";

import React from "react";
import Product from "./Product";

function Home(props) {
  return (
    <div className="home">
      <div className="home__banner">
        <img
          src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
          alt=""
        />
      </div>

      <div className="home__row">
        <Product
          id={1}
          title="Lenovo Explorer"
          price="98.99"
          rating={2}
          imageURL="https://static.lenovo.com/ww/campaigns/2017/arvr/arvr-explorer.png"
        />

        <Product
          id={2}
          title="The lean startup"
          price="9.99"
          rating={3}
          imageURL="https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
        />

        <Product
          id={3}
          title="Lenovo legion i7"
          price="1699.99"
          rating={4}
          imageURL="https://www.lenovo.com/medias/lenovo-laptop-legion-7-gallery-1.png?context=bWFzdGVyfHJvb3R8MjgyMDY4fGltYWdlL3BuZ3xoMGQvaGQxLzEwODQ1MDIxOTI5NTAyLnBuZ3xlMDZiNWRmNTg3NDY2MDNmOTk2ZDY3YzIyOWIzMjZkNGMzM2U4NzYyOTc5NWQ2MDE2ZTgxYWFjZGM0NGZiYTFi"
        />
      </div>
      <div className="home__row">
        <Product
          id={4}
          title="Apple watch"
          price="19.99"
          rating={3}
          imageURL="https://c2.lestechnophiles.com/images.frandroid.com/wp-content/uploads/2019/09/apple-watch-series-5-frandroid-2019.png?resize=580,580"
        />

        <Product
          id={5}
          title="Screen Dell SE2216H"
          price="121.62"
          rating={4}
          imageURL="https://m.media-amazon.com/images/I/812cGsOJhtL._AC_SL1500_.jpg"
        />
      </div>
      <div className="home__row">
        <Product
          id={6}
          title="28`` UHD 4K Monitor UR550"
          price="269.00"
          rating={5}
          imageURL="https://images.samsung.com/is/image/samsung/p6pim/be_fr/lu28r550uqrxen/gallery/be-fr-uhd-monitor-ur55-313606-lu28r550uqrxen-412140045?$720_576_PNG$"
        />
      </div>
    </div>
  );
}

export default Home;
