import General from './tabs/General';
import { useContext } from 'react';
import { TemplateContext } from '../pages/pagesMains/GravesManagers/Graves';

export default function Content() {
  const { currentTab } = useContext(TemplateContext);

  switch (currentTab) {
    case 0:
      return <General />;
    case 1:
      return <div>
        ההגדרות בפיתוח
      </div>;
    case 2:
      return <div>
        ההגדרות בפיתוח
      </div>;
    default:
      return <div>בחר טאב</div>;
  }
}

