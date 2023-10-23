import { CardAction } from "@/components/CardAction";
import { CurrentBalance } from "@/components/CurrentBalance"
import { Typography } from "@mui/material"
import Grid2 from "@mui/material/Unstable_Grid2/Grid2"
import Link from "next/link";
import { MyLatestTransactions } from "./MyLatestTransactions";
import { Transaction } from "@/models";

export async function getTransactions(bankAccountId: string): Promise<Transaction[]> {
    const response = await fetch(`http://host.docker.internal:3000/bank-accounts/${bankAccountId}/transactions`, {
        next: {
            revalidate: 10
        }
    })
    return response.json()
}

export async function BankAccountDashboardPage({
    params,
}: {
    params: { bankAccountId: string }
}) {
    const transactions = await getTransactions(params.bankAccountId)

    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12} lg={6}>
                <div>
                    <CurrentBalance bankAccountId={params.bankAccountId} />
                </div>
            </Grid2>
            <Grid2 container xs={12} lg={6} spacing={1}>
                <Grid2 xs={6}>
                    <Link
                        href={`/bank-accounts/${params.bankAccountId}/withdraw`}
                        style={{ textDecoration: "none" }}
                    >
                        <CardAction sx={{ display: "flex", alignItems: "center" }}>
                            <Typography component="span" color={"primary"}>
                                Transferência
                            </Typography>
                        </CardAction>
                    </Link>
                </Grid2>
                <Grid2 xs={6}>
                    <Link
                        href={`/bank-accounts/${params.bankAccountId}/pix`}
                        style={{ textDecoration: "none" }}
                    >
                        <CardAction sx={{ display: "flex", alignItems: "center" }}>
                            <Typography component="span" color={"primary"}>
                                Nova chave pix
                            </Typography>
                        </CardAction>
                    </Link>
                </Grid2>
            </Grid2>
            <Grid2 xs={12}>
                <Typography variant="h5">Últimos lançamentos</Typography>
                <MyLatestTransactions transactions={[]} />
            </Grid2>
        </Grid2>
    );

}

export default BankAccountDashboardPage