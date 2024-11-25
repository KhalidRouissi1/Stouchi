import './KhalidProSpinner.css';
interface KhalidProSpinnerProps {
  h: string;
}
const KhalidProSpinner: React.FC<KhalidProSpinnerProps> = ({ h }) => {
  return (
    <div style={{ height: `${h}vh` }} className="khaledSpin">
      /
    </div>
  );
};

export default KhalidProSpinner;
