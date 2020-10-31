import React, { useState, useEffect } from 'react';
import { withRouter, useRouter } from "next/router";
import Filters from '../components/Filters';

const InitialLoad = (props) => {
  const[ fetchedData, setFetchedData ] = useState([]);
  const[ displayData, setDisplayData ] = useState([]);
  const[ selectedYear, setSelectedYear ] = useState('');
  const[ arrOfYears, setArrOfYears ] = useState([]);
  const[ successfulLaunch, setSuccessfulLaunch] = useState('');
  const[ successfulLanding, setSuccessfulLanding] = useState('');

  useEffect( () => {
      if( props.router.asPath === '/' ){
        let filteredYears = [];
        props.fetchedData.forEach( data => {
          if( !filteredYears.includes(data.launch_year) ){
            filteredYears.push(data.launch_year);
          }
        });
        filteredYears.sort( (a,b) => parseInt(a) - parseInt(b) );
        setArrOfYears(filteredYears);
        setFetchedData(props.fetchedData);
        setDisplayData(props.fetchedData);
      }else{
        let filteredYears = [];
        props.fetchedData.forEach( data => {
          if( !filteredYears.includes(data.launch_year) ){
            filteredYears.push(data.launch_year);
          }
        });
        filteredYears.sort( (a,b) => parseInt(a) - parseInt(b) );
        setArrOfYears(filteredYears);
        setFetchedData(props.fetchedData);
        setDisplayData(props.fetchedData);
        let launch = props.router.query.launch_success ? props.router.query.launch_success === "true" ? "yesLaunched" : 
        props.router.query.launch_success === "false" ? "notLaunched" : "" : "";
        let land = props.router.query.land_success ?props.router.query.land_success === "true" ? "yesLanded" : 
        props.router.query.land_success === "false" ? "notLanded" : "" : "";
        applyFilters({ data :props.fetchedData, year : props.router.query.launch_year, launch, land} );  
      }
  }, []);
  
  const applyFilters = ( {data = fetchedData, year, launch, land} ) => {
    let newFetchedData = JSON.parse(JSON.stringify( data ));
    let filteredData = newFetchedData.filter( data => {
      
      if( !year ){
        if( !launch && land === "yesLanded"){
          return data.rocket.first_stage.cores[0].land_success;
        } else if( !launch && land === "notLanded" ){
          return !data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "yesLaunched" && land === "yesLanded" ){
          return data.launch_success && data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "notLaunched" && land === "yesLanded" ){
          return !data.launch_success && data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "yesLaunched" && land === "notLanded" ){
          return data.launch_success && !data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "notLaunched" && land === "notLanded" ){
          return !data.launch_success && !data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "yesLaunched" && !land ){
          return data.launch_success;
        } else if( launch === "notLaunched" && !land ){
          return !data.launch_success;
        }
      } else{
        if( !launch && !land ){
          return year === data.launch_year;
        } else if( !launch && land === "yesLanded"){
          return year === data.launch_year && data.rocket.first_stage.cores[0].land_success;
        } else if( !launch && land === "notLanded" ){
          return year === data.launch_year && !data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "yesLaunched" && land === "yesLanded" ){
          return year === data.launch_year && data.launch_success && data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "notLaunched" && land === "yesLanded" ){
          return year === data.launch_year && !data.launch_success && data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "yesLaunched" && land === "notLanded" ){
          return year === data.launch_year && data.launch_success && !data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "notLaunched" && land === "notLanded" ){
          return year === data.launch_year && !data.launch_success && !data.rocket.first_stage.cores[0].land_success;
        } else if( launch === "yesLaunched" && !land ){
          return year === data.launch_year && data.launch_success;
        } else if( launch === "notLaunched" && !land ){
          return year === data.launch_year && !data.launch_success;
        }
      }
    }); 
    setSuccessfulLaunch(launch);
    setSuccessfulLanding(land);
    setDisplayData( filteredData );
    setSelectedYear( year );
  }

  const clearFilters = () => {
    setSelectedYear('');
    setSuccessfulLaunch('');
    setSuccessfulLanding('');
    setDisplayData(fetchedData);
    props.router.push("/", "/", { shallow: true });
  }

  return(
    <div className="container">
      <h2>{`SpaceX Launch Programs`}</h2>
      {
        arrOfYears.length > 0 &&
        <Filters arrOfYears={arrOfYears} 
          applyFilters={applyFilters} 
          selectedYear={selectedYear} 
          successfulLaunch={successfulLaunch}
          successfulLanding={successfulLanding}
          clearFilters={clearFilters} />
      }
      {
        displayData.length > 0 &&
        <div className="dispProg">
          {displayData.map( (data, i) => (
            <div key={i} className="card">
              <img src={data.links.mission_patch_small} className="cardImg"/>
              <p className="cardHeading">{`${data.mission_name} #${data.flight_number}`}</p>
              <p className="mission">{`Mission Ids -`}</p>
              {data.mission_id.length === 0 && <p className="missionId">&#8226;{` NA`}</p>}
              {data.mission_id.length > 0 && <p className="missionId">&#8226;
                {data.mission_id.length > 0 && data.mission_id.map(( mission, i )=>(
                  <span key={i}>
                    <span>{`${i === 0 ? `` : `, `} ${mission} `}</span>
                  </span>
                ))}
              </p>}
                <p className="mission">
                  {`Launch Year : `}
                  <span className="details">{data.launch_year}</span>
                </p>
                <p className="mission">
                  {`Successful Launch : `}
                  <span className="details">{data.launch_success ? `Yes` : `No`}</span>
                </p>
                <p className="mission">
                  {`Successful Landing : `}
                  <span className="details">{data.rocket.first_stage.cores[0].land_success ? `Yes` : `No`}</span>
                </p>
            </div>
          ))}
        </div>
      }
    </div>
  )
}

export default withRouter(InitialLoad);

InitialLoad.getInitialProps = async () => {
  return {};
};

export async function getServerSideProps() {
  const res = await fetch( 'https://api.spaceXdata.com/v3/launches?limit=100' );
  const fetchedData = await res.json();
  return {
    props: {
      fetchedData
    }
  }
}