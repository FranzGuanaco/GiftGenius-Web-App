import {React, useState} from 'react';
import './ProductInfo.css'; 

function ProductInf() {
  const [openItem, setOpenItem] = useState(null);

    const toggleItem = (item) => {
        if (openItem === item) {
            setOpenItem(null); // Fermer si c'est déjà ouvert
        } else {
            setOpenItem(item); // Ouvrir le nouvel élément
        }
    };

    const getItemHeight = (item) => {
        switch (item) {
            case "ac-1": return "100px";
            case "ac-2": return "140px";
            
            default: return "0px";
        }
    };

    const isItemOpen = (item) => openItem === item;

    return (
      <section className="ac-container">
        <div>
          <label htmlFor="ac-1" onClick={() => toggleItem("ac-1")} style={{ /* Votre style ici */ }}>
          <p className="span">
        details 
        <span>{isItemOpen("ac-1") ? "-" : "+"}</span>
    </p>
          </label>
          <hr/>
          <article className="ac-small" style={{ height: openItem === "ac-1" ? getItemHeight("ac-1") : "0" }}>
            <p>Votre texte ici...</p>
          </article>
        </div>
        <div>
          <label htmlFor="ac-2" onClick={() => toggleItem("ac-2")} style={{ /* Votre style ici */ }}>
          <p className="span">
        about me 
        <span>{isItemOpen("ac-2") ? "-" : "+"}</span>
    </p>
            
          </label>
          <hr/>
          <article className="ac-medium" style={{ height: openItem === "ac-2" ? getItemHeight("ac-2") : "0" }}>
            <p>Votre texte ici...</p>
          </article>
        </div>
        {/* Ajoutez plus de sections si nécessaire */}
      </section>
    );
  }
  
  export default ProductInf;