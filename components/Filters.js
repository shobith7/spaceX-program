import React from 'react';
import { withRouter, useRouter } from "next/router";

const filters = (props) => {
    return (    
        <div className="filterOPtions">
          <div className="filterDisp">
            <p className="filtHeading">
              <span>{`Filters`}</span>
              <span 
                className="clear"
                onClick={ e => {
                  e.preventDefault();
                  props.clearFilters();
                }}
              >{`Clear`}</span>
            </p>
            <div>
              <p className="launchYear">Launch Year</p>
              {props.arrOfYears.map((year, index) => (
                <span
                  className={year === props.selectedYear ? "selectedFilter" : "yearShow"}
                  key={index}
                  onClick={ e => {
                    e.preventDefault();
                    props.applyFilters({year, launch : props.successfulLaunch, land : props.successfulLanding});
                    let query = `?limit=100${props.successfulLaunch==="yesLaunched"? "&launch_success=true" : ""}${props.successfulLanding==="yesLanded"? "&land_success=true" : ""}${year? `&launch_year=${year}` : ""}`
                    props.router.push(query, query,{ shallow: true });
                  }}
                >
                {year}
                </span>
              ))}
            </div>
            <p className="launchYear">{`Successful Launch`}</p>
            <span 
              className={props.successfulLaunch === "yesLaunched" ? "selectedFilter" : "yearShow"} 
              onClick={e => {
              e.preventDefault();
              props.applyFilters({year : props.selectedYear, launch :"yesLaunched", land : props.successfulLanding});
              let query = `?limit=100&launch_success=true${props.successfulLanding==="yesLanded"? "&land_success=true" : ""}${props.selectedYear? `&launch_year=${props.selectedYear}` : ""}`
              props.router.push(query, query,{ shallow: true });
            }}>
              {`True`}
            </span>
            <span 
              className={props.successfulLaunch === "notLaunched" ? "selectedFilter" : "yearShow"} 
              onClick={e => {
              e.preventDefault();
              props.applyFilters({year : props.selectedYear, launch : "notLaunched", land : props.successfulLanding});
              let query = `?limit=100${props.successfulLanding==="yesLanded"? "&land_success=true" : ""}${props.selectedYear? `&launch_year=${props.selectedYear}` : ""}`
              props.router.push(query, query,{ shallow: true });
            }}>
              {`False`}
            </span>
            <p  className="launchYear">{`Successful Landing`}</p>
            <span 
              className={props.successfulLanding === "yesLanded" ? "selectedFilter" : "yearShow"} 
              onClick={e => {
              e.preventDefault();
              props.applyFilters({ year : props.selectedYear, launch : props.successfulLaunch, land : "yesLanded" });
              let query = `?limit=100${props.successfulLaunch==="yesLaunched"? "&launch_success=true" : ""}&land_success=true${props.selectedYear? `&launch_year=${props.selectedYear}` : ""}`
              props.router.push(query, query,{ shallow: true });
            }}>{`True`}</span>
            <span 
              className={props.successfulLanding === "notLanded" ? "selectedFilter" : "yearShow"}
              onClick={e => {
              e.preventDefault();
              props.applyFilters({ year : props.selectedYear, launch : props.successfulLaunch, land : "notLanded" });
              let query = `?limit=100${props.successfulLaunch==="yesLaunched"? "&launch_success=true" : ""}${props.selectedYear? `&launch_year=${props.selectedYear}` : ""}`
              props.router.push(query, query,{ shallow: true });
            }}>{`False`}</span>
          </div>
        </div>
    )
}

export default withRouter(filters);
