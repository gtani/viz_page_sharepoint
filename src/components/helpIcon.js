
import { Tooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'
import { useTranslation } from 'react-i18next';

function HelpIcon({ id, place = "right" }) {

    const { t } = useTranslation()

    return (
        <>
            <span id={`tt-${id}`} data-tooltip-html={t(id)} data-tooltip-place={place} data-tooltip-delay-show={200} data-tooltip-events="click" data-tooltip-variant="light" className="text-sm cursor-pointer" >
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="ml-2 inline" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"></path>
                    <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z"></path>
                </svg>
            </span>
            <Tooltip anchorId={`tt-${id}`} style={{ zIndex: 100, fontSize: "14px", pointerEvents: "auto", textAlign: "left" }} className="tooltip" clickable={true} />
        </>
    )



}

export default HelpIcon;