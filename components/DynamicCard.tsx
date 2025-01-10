import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

export type DynamicCardProps = {
  title: string | React.ReactNode;
  icon: ReactNode;
  data: string | number;
  description: string;
};

export default function DynamicCard({
  title,
  icon,
  data,
  description,
}: DynamicCardProps) {
  return (
    <Card className="flex-1 min-w-[230px] shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{data}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
