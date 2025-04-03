import React, { useState } from 'react';
import './BinarySearch.css';

const BinarySearch = () => {
  const [array] = useState([
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
    27, 28, 29, 30,
  ]);
  const [searchKey, setSearchKey] = useState('');
  const [result, setResult] = useState(null);
  const [searchPath, setSearchPath] = useState([]);
  const [currentMid, setCurrentMid] = useState(null);
  const [currentLeft, setCurrentLeft] = useState(null);
  const [currentRight, setCurrentRight] = useState(null);

  const binarySearchIterative = async (arr, key) => {
    let left = 0;
    let right = arr.length - 1;
    let comparisons = 0;
    let path = [];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      setCurrentMid(mid);
      setCurrentLeft(left); // <-- Добавлено
      setCurrentRight(right); // <-- Добавлено
      await new Promise((resolve) => setTimeout(resolve, 2000));

      path.push(arr[mid]);
      comparisons += 2;
      if (arr[mid] === key) {
        setSearchPath(path);
        return { element: arr[mid], index: mid, comparisons };
      } else if (arr[mid] < key) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  };

  const handleSearch = async () => {
    const key = parseInt(searchKey, 10);

    if (isNaN(key)) {
      setResult({ element: null, index: -1, comparisons: 0 });
      return;
    }

    setResult(null);
    setSearchPath([]);
    setCurrentMid(null);
    setCurrentLeft(null); // <-- Сброс
    setCurrentRight(null); // <-- Сброс

    const searchResult = await binarySearchIterative(array, key);
    setResult(searchResult);
  };

  return (
    <div className="container" style={{ fontSize: '24px' }}>
      <h1 className="title" style={{ fontSize: '32px' }}>
        Бинарный поиск
      </h1>
      <div className="array-display">
        <p style={{ fontSize: '28px' }}>
          Исходный массив:
          <span style={{ marginLeft: '10px', color: 'Highlight', fontSize: '28px' }}>
            {array.length} элементов
          </span>
        </p>
        <div className="array-container">
          {array.map((num, index) => (
            <span
              key={index}
              className={`array-item ${
                index === currentMid
                  ? 'mid'
                  : searchPath.includes(num)
                  ? 'visited'
                  : currentLeft !== null &&
                    currentRight !== null &&
                    index >= currentLeft &&
                    index <= currentRight
                  ? 'active-range'
                  : ''
              }`}
              style={{ fontSize: '28px', padding: '10px' }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      <div className="input-group">
        <label style={{ fontSize: '24px' }}>
          Ключ поиска:
          <input
            className="search-input"
            type="number"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
            style={{ fontSize: '24px', padding: '10px' }}
          />
        </label>
      </div>

      <button
        className="search-btn"
        onClick={handleSearch}
        style={{ fontSize: '24px', padding: '15px' }}
      >
        Поиск
      </button>

      {result && (
        <div
          className={`result ${result.element !== null ? 'success' : 'error'}`}
          style={{ fontSize: '24px', padding: '15px' }}
        >
          {result.element !== null ? (
            <>
              <p>
                Найден элемент: <span style={{ fontWeight: '700' }}>{result.element}</span>
              </p>
              <p>
                Позиция в массиве: <span style={{ fontWeight: '700' }}>{result.index + 1}</span>
              </p>
            </>
          ) : (
            <p>Элемент не найден.</p>
          )}
          <p>
            Количество сравнений: <span style={{ fontWeight: '700' }}>{result.comparisons}</span>
          </p>
          <p>
            Путь поиска: <span style={{ fontWeight: '700' }}>{searchPath.join(' → ')}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default BinarySearch;
