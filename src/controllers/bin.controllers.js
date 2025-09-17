import Bin from "../models/bin.models.js";

const registerBin = async (req, res) => {
    try {
        const { binId, lat, lng, status } = req.body;
        if (!binId || lat === undefined || lng === undefined) {
            return res.status(400).json({ error: "binId, lat and lng are required" });
        }

        const existingBin = await Bin.findOne({ binId });
        if (existingBin) return res.status(400).json({ error: "Bin already registered" });

        // Create new bin
        const bin = new Bin({
            binId,
            location: { lat, lng },
            fillLevel: 0,
            status: status || "active"
        });

        await bin.save();
        res.json({ message: "Bin registered successfully", bin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

// IoT device fillLevel update
const updateFillLevel = async (req, res) => {
    try {
        const { binId } = req.params;
        const { fillLevel } = req.body;

        if (fillLevel == null || fillLevel < 0 || fillLevel > 100) {
            return res.status(400).json({ error: 'fillLevel must be between 0 and 100' });
        }

        const bin = await Bin.findById(binId);
        if (!bin) return res.status(404).json({ error: 'Bin not found' });

        bin.fillLevel = fillLevel;

        // Optionally update status
        if (fillLevel === 0) bin.status = 'empty';
        else if (fillLevel < 100) bin.status = 'partially full';
        else bin.status = 'full';

        await bin.save();

        res.json({ message: 'Fill level updated', bin });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Get all bins
const getAllBins = async (req, res) => {
    try {
        const bins = await Bin.find();
        res.json(bins);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Server error" });
    }
};

export {
    registerBin,
    updateFillLevel,
    getAllBins
}