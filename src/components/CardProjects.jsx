import CountUp from "react-countup";


function CardQueries(props) {
    return (
        <div className='col-lg-3 col-sm-6'>
            <div className="small-box bg-primary">
                <div className="inner">
                    <h3>
                        <CountUp end={props.total}
                            useGrouping={false}
                            duration={"2"} />
                    </h3>
                    <p>Total Projects</p>
                </div>
                <div className="icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 18c1.1 0 1.99.9 1.99 2L22 20H2v-.01C2 18.9 2.9 18 4 18h16zM20 4H4c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM4 6h16v9H4V6z"></path>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export default CardQueries;