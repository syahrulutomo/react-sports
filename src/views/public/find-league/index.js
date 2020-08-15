import React, { useEffect, useState } from 'react';
import { LayoutDefault, Select, Checkbox, Input, Button } from '../../../components';
import PropTypes from 'prop-types';
import { fetchSports } from '../../../services/redux/actions/sports';
import { fetchLeagues, fetchLeagueDetails } from '../../../services/redux/actions/leagues';
import { connect } from 'react-redux';
import axios from '../../../services/libs/axios';

function FindLeagueView(props) {
  const { sports, onFetchSports, leagues, onFetchLeagues } = props;

  const [mappedSports, setMappedSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [sortByName, setSortByName] = useState(false);
  const [sortBySport, setSortBySport] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedLeagues, setSelectedLeagues] = useState([]);

  const handleSelectSport = (e) => {
    setSelectedSport(e.target.value);
    setSelectedLeagues([]);
    const data = leagues.filter((s) => s.strSport === e.target.value);
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

  const handleChangeSortByName = () => {
    setSortByName(!sortByName);
  }

  const handleChangeSortBySport = () => {
    setSortBySport(!sortBySport);
  }
  
  const handleChangeSearchText = (e) => {
    setSearchText(e.target.value);
  }

  const handleClickSearch = () => {
    setSelectedLeagues([]);
    const regex = new RegExp(searchText, 'gi' );
    const data = leagues.filter((s) => s.strLeague.match( regex));
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
            disabled
          />
          <Checkbox 
            id="checkbox-sort-by-sport" 
            value={sortBySport} 
            handleChange={handleChangeSortBySport} 
            label="sport" 
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
    </LayoutDefault>
  );
}

FindLeagueView.propTypes = {
  sports: PropTypes.array,
  loading: PropTypes.bool,
  leagues: PropTypes.array,
  onFetchSports: PropTypes.func,
  onFetchLeagues: PropTypes.func,
  onFetchLeagueDetails: PropTypes.func
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
    onFetchLeagues: () => dispatch(fetchLeagues()),
    onFetchLeagueDetails: (id) => dispatch(fetchLeagueDetails(id)),
   };
};

export default connect(mapStateToProps, mapDispatchToProps)(FindLeagueView);

