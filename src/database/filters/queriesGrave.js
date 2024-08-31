import { useIndexedDBSyncV2 } from "../dataLocal/indexedDBHooks";
import useQueries from "../useQueries"

const useQueryGraves = () => {

        const { getEntitiesByAttr } = useQueries()

        // קבלת נתוני דאטה בייס
        const { data: localCemeteries, loading: loadingCemeteries } = useIndexedDBSyncV2('myStore', 'dataCemeteries');
        const { data: localBlocks, loading: loadingBlocks } = useIndexedDBSyncV2('myStore', 'dataBlocks');
        const { data: localPlots, loading: loadingPlots } = useIndexedDBSyncV2('myStore', 'dataPlots');
        const { data: localAreaGraves, loading: loadingAreaGraves } = useIndexedDBSyncV2('myStore', 'dataAreaGraves');
        const { data: localGraves, loading: loadingGraves } = useIndexedDBSyncV2('myStore', 'dataGraves');

        // בדיקה שאכן התקבלו כלל הנתונים מהדאטה בייס
        const loading = loadingCemeteries || loadingBlocks || loadingPlots || loadingAreaGraves || loadingGraves



        const summarizeGraves = (graves, graveEstates) => {
                return graveEstates.map(estate => {
                        const estateGraves = getEntitiesByAttr(graves, 'areaGraveId', estate.gravesList);
                        const plotClose = estateGraves.filter(grave => grave.plotType === 'סגורה').length;
                        const plotUnusual = estateGraves.filter(grave => grave.plotType === 'חריגה').length;
                        const plotExempt = estateGraves.filter(grave => grave.plotType === 'פטורה').length;
                        const available = estateGraves.filter(grave => grave.graveStatus === "0").length;
                        const purchased = estateGraves.filter(grave => grave.graveStatus === "1").length;
                        const buried = estateGraves.filter(grave => grave.graveStatus === "2").length;

                        return {
                                estateId: estate.id,
                                plotClose: plotClose,
                                plotUnusual: plotUnusual,
                                plotExempt: plotExempt,
                                available: available,
                                purchased: purchased,
                                buried: buried
                        };
                });
        };


        // מיון לפי סטטוס קבר
        const getSummaryByCemetery = (cemetery) => {
                const blocks = getEntitiesByAttr(localBlocks, 'cemeteryId', cemetery?.id);
                const plots = localPlots.filter(plot => blocks.some(block => block?.id === plot?.blockId));
                const areaGraves = localAreaGraves.filter(areaGrave => plots.some(plot => plot?.id === areaGrave?.plotId));
                const graves = localGraves.filter(grave => areaGraves.some(areaGrave => areaGrave?.gravesList === grave?.areaGraveId));

                // יצירת אובייקטים שמכילים את הנתונים עבור כל קטגוריה
                const categories = {
                        exemption: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        closed: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        unusual: { free: 0, purchases: 0, reserved: 0, burials: 0 }
                }

                const updatedCategories = graves.reduce((acc, grave) => {
                        const category = grave.plotType === 1 ? 'exemption' : grave.plotType === 3 ? 'closed' : grave.plotType === 2 ? 'unusual' : null;

                        if (category) {
                                if (grave.graveStatus === 1) acc[category].free += 1;
                                if (grave.graveStatus === 2) acc[category].purchases += 1;
                                if (grave.graveStatus === 3) acc[category].burials += 1;
                                if (grave.graveStatus === 4) acc[category].reserved += 1;
                        }

                        return acc;
                }, categories);

                // המרת מבנה הנתונים למבנה הרצוי
                const convertToNewFormat = (categoryData) => {
                        return [
                                { type: 0, label: 'פנויים', value: categoryData.free },
                                { type: 0, label: 'רכישות', value: categoryData.purchases },
                                { type: 0, label: 'שמורים', value: categoryData.reserved },
                                { type: 0, label: 'קבורים', value: categoryData.burials },
                                { type: 1, label: 'סה״כ', value: categoryData.free + categoryData.purchases + categoryData.reserved + categoryData.burials }
                        ];
                };

                return {
                        exemption: convertToNewFormat(updatedCategories.exemption),
                        closed: convertToNewFormat(updatedCategories.closed),
                        unusual: convertToNewFormat(updatedCategories.unusual)
                };
        }
        const getSummaryByBlock = (block) => {
                const plots = getEntitiesByAttr(localPlots, 'blockId', block?.id);
                // const plots = localPlots.filter(plot => blocks.some(block => block?.id === plot?.blockId));
                const areaGraves = localAreaGraves.filter(areaGrave => plots.some(plot => plot?.id === areaGrave?.plotId));
                const graves = localGraves.filter(grave => areaGraves.some(areaGrave => areaGrave?.gravesList === grave?.areaGraveId));

                // יצירת אובייקטים שמכילים את הנתונים עבור כל קטגוריה
                const categories = {
                        exemption: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        closed: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        unusual: { free: 0, purchases: 0, reserved: 0, burials: 0 }
                }

                const updatedCategories = graves.reduce((acc, grave) => {
                        const category = grave.plotType === 1 ? 'exemption' : grave.plotType === 3 ? 'closed' : grave.plotType === 2 ? 'unusual' : null;

                        if (category) {
                                if (grave.graveStatus === 1) acc[category].free += 1;
                                if (grave.graveStatus === 2) acc[category].purchases += 1;
                                if (grave.graveStatus === 3) acc[category].burials += 1;
                                if (grave.graveStatus === 4) acc[category].reserved += 1;
                        }

                        return acc;
                }, categories);

                // המרת מבנה הנתונים למבנה הרצוי
                const convertToNewFormat = (categoryData) => {
                        return [
                                { type: 0, label: 'פנויים', value: categoryData.free },
                                { type: 0, label: 'רכישות', value: categoryData.purchases },
                                { type: 0, label: 'שמורים', value: categoryData.reserved },
                                { type: 0, label: 'קבורים', value: categoryData.burials },
                                { type: 1, label: 'סה״כ', value: categoryData.free + categoryData.purchases + categoryData.reserved + categoryData.burials }
                        ];
                };

                return {
                        exemption: convertToNewFormat(updatedCategories.exemption),
                        closed: convertToNewFormat(updatedCategories.closed),
                        unusual: convertToNewFormat(updatedCategories.unusual)
                };
        }
        const getSummaryByPlot = (plot) => {
                const areaGraves = getEntitiesByAttr(localAreaGraves, 'plotId', plot?.id);
                const graves = localGraves.filter(grave => areaGraves.some(areaGrave => areaGrave?.gravesList === grave?.areaGraveId));

                // יצירת אובייקטים שמכילים את הנתונים עבור כל קטגוריה
                const categories = {
                        exemption: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        closed: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        unusual: { free: 0, purchases: 0, reserved: 0, burials: 0 }
                }

                const updatedCategories = graves.reduce((acc, grave) => {
                        const category = grave.plotType === 1 ? 'exemption' : grave.plotType === 3 ? 'closed' : grave.plotType === 2 ? 'unusual' : null;

                        if (category) {
                                if (grave.graveStatus === 0) acc[category].free += 1;
                                if (grave.graveStatus === 1) acc[category].purchases += 1;
                                if (grave.graveStatus === 2) acc[category].burials += 1;
                                if (grave.graveStatus === 3) acc[category].reserved += 1;
                        }

                        return acc;
                }, categories);

                // המרת מבנה הנתונים למבנה הרצוי
                const convertToNewFormat = (categoryData) => {
                        return [
                                { type: 0, label: 'פנויים', value: categoryData.free },
                                { type: 0, label: 'רכישות', value: categoryData.purchases },
                                { type: 0, label: 'שמורים', value: categoryData.reserved },
                                { type: 0, label: 'קבורים', value: categoryData.burials },
                                { type: 1, label: 'סה״כ', value: categoryData.free + categoryData.purchases + categoryData.reserved + categoryData.burials }
                        ];
                };

                return {
                        exemption: convertToNewFormat(updatedCategories.exemption),
                        closed: convertToNewFormat(updatedCategories.closed),
                        unusual: convertToNewFormat(updatedCategories.unusual)
                };
        }
        const getSummaryByAreaGrave = (areaGrave) => {
                // const areaGraves = getEntitiesByAttr(localAreaGraves, 'plotId', areaGrave?.id);
                const graves = getEntitiesByAttr(localGraves, 'areaGraveId', areaGrave?.gravesList);
                // const graves = localGraves.filter(grave => areaGraves.some(areaGrave => areaGrave?.gravesList === grave?.areaGraveId));

                // יצירת אובייקטים שמכילים את הנתונים עבור כל קטגוריה
                const categories = {
                        exemption: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        closed: { free: 0, purchases: 0, reserved: 0, burials: 0 },
                        unusual: { free: 0, purchases: 0, reserved: 0, burials: 0 }
                }

                const updatedCategories = graves.reduce((acc, grave) => {
                        const category = grave.plotType === 1 ? 'exemption' : grave.plotType === 3 ? 'closed' : grave.plotType === 2 ? 'unusual' : null;

                        if (category) {
                                if (grave.graveStatus === 1) acc[category].free += 1;
                                if (grave.graveStatus === 2) acc[category].purchases += 1;
                                if (grave.graveStatus === 3) acc[category].burials += 1;
                                if (grave.graveStatus === 4) acc[category].reserved += 1;
                        }

                        return acc;
                }, categories);

                // המרת מבנה הנתונים למבנה הרצוי
                const convertToNewFormat = (categoryData) => {
                        return [
                                { type: 0, label: 'פנויים', value: categoryData.free },
                                { type: 0, label: 'רכישות', value: categoryData.purchases },
                                { type: 0, label: 'שמורים', value: categoryData.reserved },
                                { type: 0, label: 'קבורים', value: categoryData.burials },
                                { type: 1, label: 'סה״כ', value: categoryData.free + categoryData.purchases + categoryData.reserved + categoryData.burials }
                        ];
                };

                return {
                        exemption: convertToNewFormat(updatedCategories.exemption),
                        closed: convertToNewFormat(updatedCategories.closed),
                        unusual: convertToNewFormat(updatedCategories.unusual)
                };
        }



        return {
                getSummaryByCemetery,
                getSummaryByBlock,
                summarizeGraves,
                getSummaryByPlot,
                getSummaryByAreaGrave
        }
}

export default useQueryGraves;
