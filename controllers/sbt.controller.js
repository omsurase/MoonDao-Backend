import { NFTStorage } from "nft.storage";

const createSbt = async (req, res) => {
  // uploading using nft.storage
  console.log("req = " + req);
  const { image } = req.body;
  const client = new NFTStorage({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDg0MWI1RGRjMGU4MWI4QUYyZWI0NURBN0QzMTAzNjNjNTk1RTY1MTciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY3NDkwOTY5NDAzMiwibmFtZSI6ImRlY2Etb3JnIn0.GlZgUARw9EP_pA9fin75GdDIlLmk_b6uR-QM5G4bs-k',
  });
  const metadata = await client.store({
    name: "My NFT",
    description: "This is my NFT",
    image: new File([image], { type: "image/png" }),
  });
  return res.status(200).json({ metadata });
};

export {createSbt}
