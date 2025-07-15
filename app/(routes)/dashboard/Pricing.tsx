'use client'
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { PricingInteraction } from "./_components/pricing-interaction"

const Pricing = () => {
  return (
    <div>
        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Upgrade Plan</DialogTitle>
                                <DialogContent>
                                    <PricingInteraction
                                            starterMonth={9.99}
                                            starterAnnual={7.49}
                                            proMonth={19.99}
                                            proAnnual={17.49}
                                        />
                                </DialogContent>
                                {/* <Input onChange={(e) => setFileInput(e.target.value)} className="mt-3" placeholder="Enter File Name" /> */}
                            </DialogHeader>
                            {/* <DialogFooter>
                                <DialogClose asChild>
                                    <Button onClick={() => onFileCreate(fileInput)} type="button" disabled={!(fileInput&&fileInput.length>0)}>
                                    Create
                                    </Button>
                                </DialogClose>
                            </DialogFooter> */}
                        </DialogContent>
    </div>
  )
}

export default Pricing