import Button from '../Button/Button';
import InputBox from '../InputBox/InputBox';
import './SearchBar.css';

const SearchBar = (props) => {
  return(
    <div className="search-container flex flex-wrap flex-col sm:flex-nowrap justify-center">
        <div>
          <InputBox 
            name={"contract-address"} 
            placeholder={'0x8825dd9237a3a3d4f768a826bccfa161d36fbedf'} 
            onChange={props.handleChange} 
          />
          <InputBox 
            name={"token-id"} 
            placeholder={'30500010038'} 
            onChange={props.handleChange} 
          />
        </div>
        <Button 
          content={'Search'} 
          onClick={props.handleClick} 
        />
      </div>
  );
}

export default SearchBar;