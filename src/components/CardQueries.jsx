import CountUp from "react-countup";

function CardQueries(props) {
    return (
        <div className='col-lg-3 col-sm-6'>
            <div className="small-box bg-warning">
                <div className="inner">
                    <h3>
                        <CountUp end={props.total}
                            useGrouping={false}
                            duration={"2"} />
                    </h3>
                    <p>Total Queries</p>
                </div>
                <div className="icon">
                    <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 20 20" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                </div>
            </div>
        </div>
    );
}

export default CardQueries;