import useQueries from "../useQueries"

const useQuerySummery = () => {
        const { getPlotsByBlock, getAreaGravesByPlot } = useQueries()

        const getSummaryByCemetery = (blocks) => {
                let freeByGraveExempt = 0
                let purchasesByGraveExempt = 0
                let reservedByGraveExempt = 0
                let burialsByGraveExempt = 0
                
                let freeByGraveClosed = 0
                let purchasesByGraveClosed = 0
                let reservedByGraveClosed = 0
                let burialsByGraveClosed = 0

                let freeByGraveUnusual = 0
                let purchasesByGraveUnusual = 0
                let reservedByGraveUnusual = 0
                let burialsByGraveUnusual = 0

                blocks.forEach(block => {
                        let plots = getPlotsByBlock(block.id)
                        plots.forEach(plot => {
                                let areaGraves = getAreaGravesByPlot(plot.id)
                                freeByGraveExempt += areaGraves.length
                        });
                })

                return {
                        exemption : [
                                { type: 0, label: process.env.NAME_SUMMERY_FREE_HEB ,value: freeByGraveExempt },
                                { type: 0, label: 'רכישות',value: purchasesByGraveExempt },
                                { type: 0, label: 'שמורים',value: reservedByGraveExempt },
                                { type: 0, label: 'קבורים',value: burialsByGraveExempt },
                                { type: 1, label: 'סה"כ',value: freeByGraveExempt + purchasesByGraveExempt + reservedByGraveExempt + burialsByGraveExempt },        
                        ],
                        closed : [
                                { type: 0, label: process.env.NAME_SUMMERY_FREE_HEB ,value: freeByGraveClosed },
                                { type: 0, label: 'רכישות',value: purchasesByGraveClosed },
                                { type: 0, label: 'שמורים',value: reservedByGraveClosed },
                                { type: 0, label: 'קבורים',value: burialsByGraveClosed },
                                { type: 1, label: 'סה"כ',value: freeByGraveClosed + purchasesByGraveClosed + reservedByGraveClosed + burialsByGraveClosed },        
                        ],
                        unusual : [
                                { type: 0, label: process.env.NAME_SUMMERY_FREE_HEB ,value: freeByGraveUnusual },
                                { type: 0, label: 'רכישות',value: purchasesByGraveUnusual },
                                { type: 0, label: 'שמורים',value: reservedByGraveUnusual },
                                { type: 0, label: 'קבורים',value: burialsByGraveUnusual },
                                { type: 1, label: 'סה"כ',value: freeByGraveUnusual + purchasesByGraveUnusual + reservedByGraveUnusual + burialsByGraveUnusual },        
                        ]
                }
        }

        return {
                getSummaryByCemetery
        }
}

export default useQuerySummery;
