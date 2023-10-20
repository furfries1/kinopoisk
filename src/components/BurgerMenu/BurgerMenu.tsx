import React, {useState} from "react";
import Menu from "./Menu";
import './style.scss'

const BurgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false)
    const onBurgerClick = () => {
      setIsOpen((prevState) => !prevState)
    };
  return (
    <div className="burger">
      <div className="burger-icon" onClick={() => onBurgerClick()}>{isOpen ? '✖' : '☰'}</div>
      <Menu isOpen={isOpen} setIsOpen={setIsOpen}/>
    </div>
  )
}

export default BurgerMenu
