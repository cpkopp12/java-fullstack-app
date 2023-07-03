import { PropTypes } from 'prop-types';

export default function CounterButton({by, incrementParentFunction, decrementParentFunction}) {
    
   

    return (
        <div className="Counter">
            <div>
                <button className="counterButton" 
                    onClick={() => incrementParentFunction(by)}
                >+{by}</button>
                <button className="counterButton" 
                    onClick={() => decrementParentFunction(by)}
                >-{by}</button>
            </div>
        </div>
    )
}

CounterButton.propTypes = {
    by: PropTypes.number
}

CounterButton.defaultProps = {
    by: 1
}