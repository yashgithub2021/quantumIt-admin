import CountUp from "react-countup";

function CardQueries(props) {
    return (
        <div className='col-lg-3 col-sm-6'>
            <div class="small-box bg-success">
                <div class="inner">
                    <h3>
                        <CountUp end={props.total}
                            useGrouping={false}
                            duration={"2"} />
                    </h3>
                    <p>Total Feedbacks</p>
                </div>
                <div class="icon">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" aria-hidden="true" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 2H4C2.89 2 2 2.89 2 4v16l4-4h14c1.11 0 2-.89 2-2V4c0-1.11-.89-2-2-2zM18 12h-2v-2h2v2zm0-4h-2V6h2v2zm-4 4H6v-2h8v2zm0-4H6V6h8v2z"></path>
                    </svg>

                </div>
            </div>
        </div>
    );
}

export default CardQueries;