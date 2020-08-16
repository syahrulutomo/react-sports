import React, { useEffect, useState } from 'react';
import { LayoutDefault, Select, Checkbox, Input, Button } from '../../../components';
import PropTypes from 'prop-types';
import { fetchSports } from '../../../services/redux/actions/sports';
import { fetchLeagues } from '../../../services/redux/actions/leagues';
import { connect } from 'react-redux';
import axios from '../../../services/libs/axios';
import notFoundImage from '../../../assets/images/bee.png';

function FindLeagueView(props) {
  const { sports, onFetchSports, leagues, onFetchLeagues } = props;

  const [mappedSports, setMappedSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [sortByName, setSortByName] = useState(false);
  const [sortBySport, setSortBySport] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedLeagues, setSelectedLeagues] = useState([]);
  const [disableSortByName, setDisableSortByName] = useState(false);
  const [disableSortBySport, setDisableSortBySport] = useState(false);
  const [nothingFound, setNothingFound] = useState(false);

  const getLeagueDetails = (data) => {
    if(data.length > 0) {
      data.forEach(async (item) => {
        try {
          const result = await axios.get('/1/lookupleague.php?id='+item.idLeague);
          setSelectedLeagues((selectedLeagues) => [...selectedLeagues, result.data.leagues[0]]);
        } catch (error) {
          console.log(error);
        }
      });
    };
  }

  const compareByName = ( a, b ) => {
    if ( a.strLeague < b.strLeague ){
      return -1;
    }
    if ( a.strLeague > b.strLeague ){
      return 1;
    }
    return 0;
  }

  const compareBySport = ( a, b ) => {
    if ( a.strSport < b.strSport ){
      return -1;
    }
    if ( a.strSport > b.strSport ){
      return 1;
    }
    return 0;
  }
  
  const handleSelectSport = (e) => {
    setNothingFound(false);
    if(e.target.value === '') {
      setTimeout(() => getLeagueDetails(leagues), 1000);
    } 
    
    setSelectedSport(e.target.value);
    setSelectedLeagues([]);
    let data;
    if(selectedLeagues.length === 0) {
      data = leagues.filter((s) => s.strSport.toLowerCase() === e.target.value.toLowerCase());
    } else {
      data = selectedLeagues.filter((s) => s.strSport.toLowerCase() === e.target.value.toLowerCase());
    }
    if(data.length === 0) setNothingFound(true);
    getLeagueDetails(data);
  }

  const handleChangeSortByName = (e) => {
    setSortByName(!sortByName);
    if(sortByName) {
      setDisableSortBySport(false);
    } 
    else if (!sortByName) {
      setDisableSortBySport(true);
      if(selectedLeagues.length === 0) {
        getLeagueDetails(leagues);
      }
      const data = selectedLeagues.sort(compareByName);
      setSelectedLeagues([]);
      setSelectedLeagues(data);
    } 
  }

  const handleChangeSortBySport = (e) => {
    if(e.target.value === '') {
      setTimeout(() => getLeagueDetails(leagues), 2000);
    } 
    setSortBySport(!sortBySport);
    if(sortBySport) {
      setDisableSortByName(false);
    } else if(!sortBySport) {
      setDisableSortByName(true);
      if(selectedLeagues.length === 0) {
        getLeagueDetails(leagues);
      }
      const data = selectedLeagues.sort(compareBySport);
      setSelectedLeagues([]);
      setSelectedLeagues(data);
    }
  }
  
  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
    if(e.target.value === '') {
      setTimeout(() => getLeagueDetails(leagues), 5000);
    } 
  }

  const handleClickSearch = () => {
    setSelectedLeagues([]);
    const regex = new RegExp(searchText, 'gi' );
    let data;
    if(selectedLeagues.length === 0) {
      data = leagues.filter((s) => s.strLeague.match( regex));
    } else if(selectedLeagues.length > 0) {
      data = selectedLeagues.filter((s) => s.strLeague.match( regex));
    }
    
    getLeagueDetails(data);
  }

  useEffect(() => {
    if(leagues.length === 0) onFetchLeagues();
  }, [leagues, onFetchLeagues]);

  useEffect(() => {
    if(sports.length > 0) {
      const temp = sports.map((s) => {
        return { value: s.strSport, label: s.strSport }
      });
      setMappedSports(temp);
    } else {
      onFetchSports();
    }
  }, [onFetchSports, sports]);

  useEffect(() => {
    if(leagues.length > 0) {
      const sliced = leagues.slice(0, leagues.length);
      sliced.forEach(async (item) => {
        try {
          const result = await axios.get('/1/lookupleague.php?id='+item.idLeague);
          setSelectedLeagues((selectedLeagues) => [...selectedLeagues, result.data.leagues[0]]);
        } catch (error) {
          console.log(error);
        }
      });
    }
  }, [leagues]);


  return (
    <LayoutDefault>
      <div className="find-league-filter">
        {
          mappedSports.length > 0 ?
          <Select 
            label="-- Sport name --"
            data={mappedSports} 
            handleChange={handleSelectSport} 
            value={selectedSport} 
            style={{ marginRight: '20px' }}
          /> : ''
        }
        <div className="sort-by">
          <p className="sort-by-title">Sort by</p>
          <Checkbox 
            id="checkbox-sort-by-name" 
            value={sortByName} 
            handleChange={handleChangeSortByName} 
            label="name" 
            style={{ marginRight: '12px' }} 
            disabled={disableSortByName}
          />
          <Checkbox 
            id="checkbox-sort-by-sport" 
            value={sortBySport} 
            handleChange={handleChangeSortBySport} 
            label="sport" 
            disabled={disableSortBySport}
          />
        </div>
      </div>
      <div className="find-league-search">
        <Input placeholder="Search league name" value={searchText} handleChange={handleChangeSearchText} />
        <Button title="" handleClick={handleClickSearch} />
      </div>
      <section className="league-list">
        {
            selectedLeagues.length > 0 ?
            selectedLeagues.map((l) => {
              return (
                <div key={l.idLeague} className="league-list-item">
                  <div className="league-list-item-badge">
                    <img src={l.strBadge} alt={l.strLeague} />
                  </div>
                  <div className="league-list-item-desc">
                    <p className="league-list-item-desc-title">{l.strLeague}</p>
                    <p className="league-list-item-desc-country">{l.strCountry}</p>
                  </div>
                  <span className="flag">{l.strSport}</span>
                </div>
              ) 
            }) : ''
        }
      </section>
      {
        nothingFound ? 
        (
          <div className="not-found-image">
            <img src={notFoundImage} alt="not found"/>
          </div>
        ): ''
      }
    </LayoutDefault>
  );
}

FindLeagueView.propTypes = {
  sports: PropTypes.array,
  loading: PropTypes.bool,
  leagues: PropTypes.array,
  onFetchSports: PropTypes.func,
  onFetchLeagues: PropTypes.func
};

const mapStateToProps = (state) => {
  return {
    sports: state.sports.list,
    leagues: state.leagues.list,
    loading: state.sports.loading
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSports: () => dispatch(fetchSports()),
    onFetchLeagues: () => dispatch(fetchLeagues())
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindLeagueView);

