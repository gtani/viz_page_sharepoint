

import { NavLink } from "react-router-dom";
import { useMatch } from "react-router-dom";
import { useTranslation } from 'react-i18next';


export function TopNav() {

    const { t } = useTranslation();

    let style = {
        color: "white"
    };

    let activeStyle = {
        fontWeight: "bold"
    };

    return (
        <div style={{ backgroundColor: "#0F88BD" }} className="py-1 print:hidden">
            <ul className="lg:container mx-auto text-md lg:text-l flex flex-wrap text-lg text-center lg:text-right text-white justify-end">
                <li className="mr-4 lg:mr-12">
                    <NavLink to="/analytical-brief/tab1" className="inline-block " style={({ isActive }) => isActive ? activeStyle : style}>
                        {t('nav.top.analytical-brief')}
                    </NavLink>
                </li>
                <li className="mr-4 lg:mr-12">
                    <a href="mailto:" className="inline-block">
                        {t('nav.top.contact-us')}
                    </a>
                </li>
            </ul>
        </div>
    )

}

export function Nav() {

    const { t } = useTranslation();
    const isAnalyticalBrief = useMatch({ path: "analytical-brief", end: false });


    const logClick = (e) => {
        console.log("LOG CLICK NAV: ", e)
    }

    let style = {
        backgroundColor: "#DAE6EB"
    }

    let activeStyle = {
        backgroundColor: "#F9FDFE"
    };


    if (isAnalyticalBrief) {
        return (
            <ul className="text-lg lg:text-xl flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 print:hidden">
                <li className="mr-2">
                    <NavLink onClick={logClick} to="/analytical-brief/tab1" className="inline-block p-4 text-black rounded-t-sm" style={({ isActive }) => isActive ? activeStyle : style}>
                        {t('nav.main.tab1')}
                    </NavLink>
                </li>
                <li className="mr-2">
                    <NavLink onClick={logClick} to="/analytical-brief/tab2" className="inline-block p-4 rounded-t-sm text-gray-700" style={({ isActive }) => isActive ? activeStyle : style}>
                        {t('nav.main.tab2')}
                    </NavLink>
                </li>
                <li className="mr-2">
                    <NavLink onClick={logClick} to="/analytical-brief/tab3" className="inline-block p-4 rounded-t-sm text-gray-700" style={({ isActive }) => isActive ? activeStyle : style}>
                        {t('nav.main.tab3')}
                    </NavLink>
                </li>
            </ul>
        )
    }
}

export function SubNavCountries() {

    const { t } = useTranslation()

    let style = {
        color: "#171339"
    }

    let activeStyle = {
        color: "#F26A21",
        borderBottom: "1px solid #F26A21"
    };

    return (
        <ul className="text-xl flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400 my-6">
            <li className="mr-12">
                <NavLink to="/timeline-response/countries/finance" className="inline-block text-black rounded-t-sm flex justify-center" style={({ isActive }) => isActive ? activeStyle : style}>
                    {/* <IconFinance className="pt-1 inline"></IconFinance>  */}
                    {t('nav.sub.finance')}

                </NavLink>
            </li>
            <li className="mr-12">
                <NavLink to="/timeline-response/countries/hr" className="inline-block rounded-t-sm text-gray-700" style={({ isActive }) => isActive ? activeStyle : style}>
                    {t('nav.sub.hr')}
                </NavLink>
            </li>
            <li className="mr-12">
                <NavLink to="/timeline-response/countries/partnerships" className="inline-block rounded-t-sm text-gray-700" style={({ isActive }) => isActive ? activeStyle : style}>
                    {t('nav.sub.partnership')}
                </NavLink>
            </li>
        </ul>
    )


}
