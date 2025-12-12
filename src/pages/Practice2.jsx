import styles from '../css/Pages/Practice2Style.module.css'
import { Header } from '../components/Header'
import { useState, useEffect } from 'react'
import cityImage from '../assets/Practice2/city.webp';

const citiesData = [
  {
    id: 1,
    name: "Москва",
    description: "Столица России, крупнейший город страны",
    country: "Россия",
    photo: cityImage
  },
  {
    id: 2,
    name: "Санкт-Петербург", 
    description: "Культурная столица России с богатой историей",
    country: "Россия",
    photo: cityImage
  },
  {
    id: 3,
    name: "Париж",
    description: "Столица Франции, город любви и искусства",
    country: "Франция",
    photo: cityImage
  },
  {
    id: 4,
    name: "Лондон",
    description: "Столица Великобритании, финансовый центр Европы", 
    country: "Великобритания",
    photo: cityImage
  },
  {
    id: 5,
    name: "Нью-Йорк",
    description: "Крупнейший город США, город небоскребов",
    country: "США",
    photo: cityImage
  },
  {
    id: 6,
    name: "Токио",
    description: "Столица Японии, город технологий и традиций",
    country: "Япония", 
    photo: cityImage
  }
];

export const Practice2 = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('cityFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cityFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (cityId) => {
    setFavorites(prev => 
      prev.includes(cityId) 
        ? prev.filter(id => id !== cityId)
        : [...prev, cityId]
    );
  };

  const getCitiesToShow = () => {
    if (showFavorites) {
      return citiesData.filter(city => favorites.includes(city.id));
    }
    return citiesData.filter(city =>
      city.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredCities = getCitiesToShow();

  if (selectedCity) {
    return <CityDetail 
      city={selectedCity} 
      onBack={() => setSelectedCity(null)}
      isFavorite={favorites.includes(selectedCity.id)}
      onToggleFavorite={() => toggleFavorite(selectedCity.id)}
    />;
  }

  return (
    <div className={styles.wrapper}>
      <Header/>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>Города мира</h1>
          <button 
            className={styles.favoritesToggle}
            onClick={() => setShowFavorites(!showFavorites)}
          >
            Избранные ({favorites.length})
          </button>
        </div>
        
        {!showFavorites && (
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Поиск города..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        )}

        {showFavorites && (
          <div className={styles.favoritesHeader}>
            <h2>Избранные города</h2>
          </div>
        )}

        <div className={styles.citiesGrid}>
          {filteredCities.map(city => (
            <CityCard
              key={city.id}
              city={city}
              onSelect={setSelectedCity}
              isFavorite={favorites.includes(city.id)}
              onToggleFavorite={() => toggleFavorite(city.id)}
              compact={showFavorites}
            />
          ))}
        </div>

        {filteredCities.length === 0 && (
          <div className={styles.noResults}>
            {showFavorites ? 'Нет избранных городов' : 'Города не найдены'}
          </div>
        )}
      </div>
    </div>
  );
}

const CityCard = ({ city, onSelect, isFavorite, onToggleFavorite, compact = false }) => {
  return (
    <div className={styles.cityCard}>
      <div 
        className={styles.cityImage}
        onClick={() => onSelect(city)}
      >
        <img src={city.photo} alt={city.name} />
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite();
          }}
        >
          {isFavorite ? '★' : '☆'}
        </button>
      </div>
      
      <div className={styles.cityInfo}>
        <h3 onClick={() => onSelect(city)} className={styles.cityName}>
          {city.name}
        </h3>
        {!compact && (
          <>
            <p className={styles.cityDescription}>{city.description}</p>
            <p className={styles.country}>{city.country}</p>
          </>
        )}
      </div>
    </div>
  );
}

const CityDetail = ({ city, onBack, isFavorite, onToggleFavorite }) => {
  const [attractions, setAttractions] = useState([]);

  useEffect(() => {
    const mockAttractions = [
      "Исторический центр",
      "Главный музей", 
      "Знаменитый парк",
      "Архитектурный памятник"
    ];
    setAttractions(mockAttractions);
  }, [city]);

  return (
    <div className={styles.detailContainer}>
      <button onClick={onBack} className={styles.backButton}>← Назад</button>
      
      <div className={styles.detailHeader}>
        <h1>{city.name}</h1>
        <button 
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteActive : ''}`}
          onClick={onToggleFavorite}
        >
          {isFavorite ? '★ В избранном' : '☆ В избранное'}
        </button>
      </div>

      <div className={styles.detailContent}>
        <div className={styles.detailImage}>
          <img src={city.photo} alt={city.name} />
        </div>
        
        <div className={styles.detailInfo}>
          <h2>Описание</h2>
          <p>{city.description}</p>
          
          <h2>Страна</h2>
          <p>{city.country}</p>
          
          <h2>Достопримечательности</h2>
          <ul className={styles.attractionsList}>
            {attractions.map((attraction, index) => (
              <li key={index}>{attraction}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}