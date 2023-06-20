import { ReactComponent as Logo } from '../assets/logo-small.svg';

import { Nav, TopNav } from './nav';

import { useTranslation } from 'react-i18next';
import { useMatch } from "react-router-dom";

function NumberIcon(props) {
    return (
        <div className="flex m-2 p-2">
            {props.icon}
            <div className="pl-2 flex flex-col justify-center">
                <h3 className="text-md text-white leading-4">{props.title}</h3>
                <p className="text-3xl font-bold text-white">
                    {props.number}
                </p>
            </div>
        </div>
    )
}

function HeaderImage() {

    // uncomment next line to disable image
    // return <></>

    return <div className='object-contain min-w-[50%]' >
        <img src="data/analytical-brief/header_image.png" />
    </div>
}


function Header(props) {

    const ns =  'analytical-brief';

    const textWidth =  "max-w-3xl";

    const { t } = useTranslation();

    return (
        <header className="page-header">
            <TopNav />
            {/*<div className="lg:container mx-auto pt-6 pl-6 pr-6 */}
            {/*bg-[url('./assets/logo-small.svg')] bg-no-repeat bg-right-bottom bg-[length:auto_110%]">*/}
                            <div className="lg:container mx-auto pt-6 pl-6 pr-6
             bg-no-repeat bg-right-bottom bg-[length:auto_110%]">


                <div style={{ width: "268px" }} className="pb-4">
                    <Logo />
                </div>
                <h1 className="text-4xl font-bold text-white pb-2">
                    {t(`header.${ns}.title`)}
                </h1>

                <div className="flex flex-col lg:flex-row mb-6 justify-between">
                    <div className={`text-white ${textWidth} pb-6`} dangerouslySetInnerHTML={{ __html: t(`header.${ns}.description`) }}>
                    </div>

                </div>
                <Nav />
            </div>
        </header>
    )

}

export default Header