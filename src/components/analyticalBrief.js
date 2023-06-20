import { useParams } from "react-router-dom";

import Plot from 'react-plotly.js';
import { useState, useEffect } from "react";

import useSWR from 'swr'
import { fetcher } from '../utils'
import { useNavigate } from "react-router-dom";
import slugify from "slugify";
import parse, { attributesToProps, domToReact } from 'html-react-parser';
import { Tooltip } from 'react-tooltip'


function RenderPlot({ figure }) {

    console.log("PRE", figure.printSrc ? `data/analytical-brief/${figure.printSrc}` : null);

    const { data: pdata, error: perror, isLoading: pisLoading } = useSWR(figure.printSrc ? `data/analytical-brief/${figure.printSrc}` : null, fetcher);
    const { data, error, isLoading } = useSWR(`data/analytical-brief/${figure.src}`, fetcher);

    if (error || perror) return <div>failed to load</div>
    if (isLoading || pisLoading) return <div>loading...</div>
    if (data.layout) {
        data.layout.autosize = true;
    }
    if (pdata?.layout) {
        pdata.layout.autosize = true;
    }

    return (
        <>
            <div style={{
                minHeight: `${data.layout.height ? data.layout.height : '400'}px`,
            }} className={`mb-4 lg:mb-0 ${pdata ? "print:hidden" : null}`}>
                <Plot
                    data={data.data}
                    layout={data.layout}
                    useResizeHandler={false}
                    style={{ width: "100%", height: "350px" }}
                    config={{
                        scrollZoom: false,
                        displaylogo: false,
                        modeBarButtonsToAdd: [],
                        modeBarButtonsToRemove: [
                            "lasso",
                            "zoom",
                            "pan",
                            "select",
                            "zoomIn",
                            "zoomOut",
                            "autoScale",
                            "resetScale"
                        ]
                    }}
                />
            </div>
            {pdata &&
                <div style={{
                    minHeight: `${pdata.layout.height ? pdata.layout.height : '400'}px`,
                }} className="mb-4 lg:mb-0 hidden print:block">
                    <Plot
                        data={pdata.data}
                        layout={pdata.layout}
                        useResizeHandler={false}
                        style={{ width: "100%", height: "350px" }}
                        config={{
                            scrollZoom: false,
                            displaylogo: false,
                            modeBarButtonsToAdd: [],
                            modeBarButtonsToRemove: [
                                "lasso",
                                "zoom",
                                "pan",
                                "select",
                                "zoomIn",
                                "zoomOut",
                                "autoScale",
                                "resetScale"
                            ]
                        }}
                    />
                </div>
            }
        </>
    )

}


function RenderImage({ figure }) {
    return (
        <div className="mb-4 lg:mb-0">
            <img src={`data/analytical-brief/${figure.src}`} alt={figure.alt} />
        </div>
    )
}

function RenderFigure({ hasChoice, cls, figures, Component, onFigChange, current, setCurrent, figureTimer }) {

    const [userSelect, setUserSelect] = useState(false);

    const onUserFigChange = (event) => {
        setUserSelect(true);
        onFigChange(event);
    }

    useEffect(() => {
        if (figureTimer && userSelect == false && figures.length > 1) {
            const interval = setInterval(() => {
                if (current == figures.length - 1) {
                    setCurrent(0);
                } else {
                    setCurrent(current + 1);
                }
            }, figureTimer);

            return () => clearInterval(interval);
        } else {
            return () => { };
        }
    }, [current, userSelect]);

    if (figures[current] == undefined) {
        return <></>
    }
    return (
        <div className={cls}>
            <div className="flex mb-2">
                <h3 className="text-lg flex-inline">{figures[current].title}</h3>
                {hasChoice &&
                    <select onChange={onUserFigChange} value={current} className=" ml-auto inline border rounded-sm border-slate-200 bg-white text-sm py-2 px-3 print:hidden">
                        {figures.map((fig, i) => <option value={i} key={i}>{fig.name}</option>)}
                    </select>
                }
            </div>
            <Component figure={figures[current]} />
        </div>
    )
}


function FigureObject({ figure, text, figureTimer, footnotes, title }) {

    let figures = [figure];
    let hasChoice = false;
    if (Array.isArray(figure)) {
        figures = figure;
        figure = figures[0];
        hasChoice = true;
    }

    const [current, setCurrent] = useState(0);

    function onFigChange(event) {
        let val = parseInt(event.target.options[event.target.selectedIndex].value)
        setCurrent(val)
    }

    const width = (figure && figure.width) || "full"
    const align = (figure && figure.align) || "left"
    const reverse = align == "right";

    const Component = figure && figure.type == "image" ? RenderImage : RenderPlot;



    text = text.replace(/\[([^\]]+)\]/g, (matched, id, original) => {
        return `<a class="footnote-link" href="#footnotes-${slugify(id)}" aria-describedby="footnote-label" id="footnotes-${slugify(id)}-ref">${id}</a>`
    })

    let cls;
    let containterCls;
    if (figure && figure.float) {
        containterCls = [
            "mb-6"

        ]
        cls = `lg:w-${width} lg:${reverse ? "float-right" : "float-left"}`
    } else {
        containterCls = [
            "lg:flex", "lg:flex-wrap", "lg:gap-4", "lg:mb-6", reverse ? "lg:flex-row-reverse" : ""
        ]
        cls = `basis-${width}`
    }



    const textClasses = figure && !figure.float ? "flex items-center justify-center" : ""

    Object.keys(footnotes).forEach(function (key) {
        footnotes[slugify(key)] = footnotes[key]
    })

    let counter = 0;
    const jsx = parse(text, {
        replace: domNode => {
            if (domNode.type === "tag" && domNode.name == "a" && domNode.attribs.class == "footnote-link") {
                counter += 1
                const attr = domNode.attribs.href.split('#footnotes-')[1]
                const props = attributesToProps(domNode.attribs)
                const text = footnotes[attr] || ""
                return <>
                    <span id={`tooltip-${attr}-${counter}`} data-tooltip-delay-hide={400} data-tooltip-html={text} data-tooltip-events="hover click" data-tooltip-variant="light" data-tooltip-clickable="true">
                        <a {...props} >
                            {domToReact(domNode.children)}
                        </a>
                    </span>
                    <Tooltip anchorId={`tooltip-${attr}-${counter}`} style={{ maxWidth: "600px", zIndex: 100, fontSize: "14px", pointerEvents: "auto", textAlign: "left" }} className="tooltip" clickable>

                    </Tooltip>
                </>

            }
            //
        }
    });

    return (
        <div className={containterCls.join(' ')}>
            {figure && <RenderFigure
                hasChoice={hasChoice}
                cls={cls}
                figures={figures}
                Component={Component} onFigChange={onFigChange} current={current} setCurrent={setCurrent} figureTimer={figureTimer} />}

            <div className={`lg:flex-1 lg:${reverse ? "pr-16" : "pl-16"} lg:flex-col ${textClasses}`}>
                {/* <div className="" dangerouslySetInnerHTML={{ __html: text }}>
                </div> */}
                {/* <h1 className="text-xl font-semibold mb-6">{title}</h1> */}

                <div>

                    {
                        jsx.map((el, i) => {
                            return el
                        })
                    }
                </div>

            </div>
        </div >
    )

}


export default function AnalyticalBrief(props) {

    let params = useParams();
    const navigate = useNavigate();
    const { data, error, isLoading } = useSWR(`data/analytical-brief/${params.segment}.json`, fetcher)

    console.log("LOADING ANALYTICAL BRIEF", error, isLoading, data);

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    console.log("LOAD ANALYTICAL BRIEF", error, isLoading, data);

    const handleClick = (event) => {

        if (event.target.tagName != "A") {
            return;
        }

        const hash = (new URL(event.target.href)).hash

        if (event.target.id.startsWith('footnotes')) {
            event.preventDefault();
            let anchor = event.target.href.split('#')[1];
            document.getElementById(anchor).scrollIntoView()
        } else if (hash.startsWith('#/')) {
            navigate("/" + hash)
        } else if (event.target.href.includes('#')) {
            event.preventDefault();
            let anchor = event.target.href.split('#')[1];
            document.getElementById(decodeURI(anchor)).scrollIntoView()
        } else {
            event.target.setAttribute('target', '_blank');
        }


    }


    return (
        <div className="analytical-brief " onClick={handleClick}>

            <div className="px-2 lg:px-6 mx-auto container print:max-w-full print:ml-0 print:mr-0">

                <h1 className="text-5xl font-semibold  mb-6 mt-10" id={data.title}>
                    {data.title}

                    <div class="print:hidden float-right flex flex-col items-center text-2xl leading-3">
                        <button className="" href="" onClick={() => window.print()}>
                            🖶
                            <p class="text-center text-sm font-normal">pdf version</p>
                        </button>
                    </div>

                </h1>

                {
                    data.blocks.map((block, j, { length }) => {
                        return (
                            <div key={`${j}`}>
                                {block.title && <h1 className="text-xl mt-6 mb-6" id={block.title}>{block.title}</h1>}
                                <br></br>
                                <FigureObject footnotes={data.footnotes} figure={block.figure} text={block.text} figureTimer={block.figureTimer} />
                                {
                                    j < length - 1 && <hr className="rounded" style={{ size: "20" }}></hr>
                                }
                            </div>
                        )
                    })
                }
            </div >

            {
                data.sections.map((section, i) => {

                    return (
                        <section key={i} style={{ backgroundColor: i % 2 == 0 ? "white" : '#EDF8FD' }} className="p-2 break-before-page">

                            <div className="px-2 lg:px-6 mx-auto container print:max-w-full print:ml-0 print:mr-0">
                                <h1 className="text-4xl font-semibold mt-6 mb-6" id={section.title}>{section.title}</h1>

                                <FigureObject footnotes={data.footnotes} figure={section.figure} text={section.text} />

                                {
                                    section.blocks.map((block, j, { length }) => {
                                        return (
                                            <div key={`${i}-${j}`}>

                                                <FigureObject footnotes={data.footnotes} figure={block.figure} text={block.text} figureTimer={block.figureTimer} title={block.title} />

                                                {
                                                    j < length - 1 && <hr className="rounded my-10" style={{ size: "20", borderColor: i % 2 == 0 ? "#e5e7eb" : '#ccdfe3' }}></hr>
                                                }
                                            </div>
                                        )
                                    })
                                }
                            </div>
                        </section>
                    )

                })
            }

            < footer className="mt-6 py-4 border-gray-200 " onClick={handleClick} >
                <div className="px-6 mx-auto container print:max-w-full print:ml-0 print:mr-0">
                    <h2 className="sr-only" id="footnote-label">Footnotes</h2>
                    <ol className="pl-6 list-decimal">
                        {
                            Object.entries(data.footnotes).map(([key, value], id) => {

                                return <li key={id} id={`footnotes-${slugify(key)}`} dangerouslySetInnerHTML={{ __html: value + `<a class="pl-1 backlink" id="footnotes-${slugify(key)}-back" href="#footnotes-${slugify(key)}-ref" aria-label="Back to content">↩</a>` }}>

                                </li>
                            })
                        }
                    </ol>
                </div>
            </footer >

        </div >
    )
}