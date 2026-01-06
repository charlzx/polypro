"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Bell,
  Plus,
  TrendUp,
  Lightning,
  Pencil,
  Trash,
  Envelope,
  DeviceMobile,
  Clock,
} from "@phosphor-icons/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { alerts, alertStats, alertTypes } from "@/data/alerts";

export default function AlertsPage() {
  const [alertList, setAlertList] = useState(alerts);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newAlert, setNewAlert] = useState({
    name: "",
    type: "odds",
    market: "",
    threshold: [10],
  });

  const toggleAlert = (id: number) => {
    setAlertList((prev) =>
      prev.map((alert) => (alert.id === id ? { ...alert, active: !alert.active } : alert))
    );
  };

  const deleteAlert = (id: number) => {
    setAlertList((prev) => prev.filter((alert) => alert.id !== id));
  };

  return (
    <div className="container max-w-screen-2xl py-6 md:py-8 space-y-4 md:space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-title md:text-display font-bold">Alerts</h1>
          <p className="text-small text-muted-foreground mt-1">
            Get notified when market conditions match your criteria
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus weight="bold" className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Alert</DialogTitle>
              <DialogDescription>
                Set up conditions to get notified when markets move
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Alert Name</Label>
                <Input
                  id="name"
                  placeholder="e.g., BTC price movement"
                  value={newAlert.name}
                  onChange={(e) => setNewAlert({ ...newAlert, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Alert Type</Label>
                <Select
                  value={newAlert.type}
                  onValueChange={(value) => setNewAlert({ ...newAlert, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {alertTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="market">Market</Label>
                <Input
                  id="market"
                  placeholder="Search or enter market name..."
                  value={newAlert.market}
                  onChange={(e) => setNewAlert({ ...newAlert, market: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Threshold: {newAlert.threshold[0]}% change</Label>
                <Slider
                  value={newAlert.threshold}
                  onValueChange={(value) => setNewAlert({ ...newAlert, threshold: value })}
                  min={5}
                  max={50}
                  step={5}
                />
              </div>
              <div className="space-y-3">
                <Label>Delivery Method</Label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-small">
                    <Switch defaultChecked />
                    <Envelope weight="regular" className="h-4 w-4" />
                    Email
                  </label>
                  <label className="flex items-center gap-2 text-small">
                    <Switch defaultChecked />
                    <DeviceMobile weight="regular" className="h-4 w-4" />
                    Push
                  </label>
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
                Cancel
              </Button>
              <Button onClick={() => setIsCreateOpen(false)}>Create Alert</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4"
      >
        {alertStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label}>
              <CardContent className="p-3 md:p-4">
                <div className="flex items-center gap-2 mb-1">
                  <Icon weight="duotone" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="text-subtitle md:text-title font-bold">{stat.value}</div>
                <div className="text-caption text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </motion.div>

      {/* Separator */}
      <div className="border-t border-border my-2" />

      {/* Alerts List */}
      <div className="space-y-3">
        {alertList.map((alert, index) => (
          <motion.div
            key={alert.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.05 }}
          >
            <Card className={!alert.active ? "opacity-60" : ""}>
              <CardContent className="p-3 md:p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Alert Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <Badge variant="outline" className="text-caption">
                        {alert.type}
                      </Badge>
                      {alert.active && (
                        <span className="text-caption text-muted-foreground flex items-center gap-1">
                          <Clock weight="regular" className="h-3 w-3" />
                          Last: {alert.lastTriggered}
                        </span>
                      )}
                    </div>
                    <h3 className="text-small md:text-body font-medium">{alert.name}</h3>
                    <p className="text-caption text-muted-foreground truncate">{alert.market}</p>
                    <p className="text-caption text-muted-foreground">{alert.condition}</p>
                  </div>

                  {/* Delivery Icons */}
                  <div className="flex items-center gap-2 shrink-0">
                    <div className="flex gap-1">
                      {alert.delivery.includes("email") && (
                        <div className="p-1.5 rounded bg-secondary">
                          <Envelope weight="regular" className="h-3 w-3 text-muted-foreground" />
                        </div>
                      )}
                      {alert.delivery.includes("push") && (
                        <div className="p-1.5 rounded bg-secondary">
                          <DeviceMobile
                            weight="regular"
                            className="h-3 w-3 text-muted-foreground"
                          />
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="text-caption">
                      {alert.triggerCount}x
                    </Badge>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <Switch checked={alert.active} onCheckedChange={() => toggleAlert(alert.id)} />
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Pencil weight="regular" className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => deleteAlert(alert.id)}
                    >
                      <Trash weight="regular" className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {alertList.length === 0 && (
        <Card>
          <CardContent className="p-6 md:p-8 text-center">
            <Bell weight="duotone" className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-subtitle font-semibold mb-2">No alerts yet</h3>
            <p className="text-small text-muted-foreground mb-4">
              Create your first alert to stay informed about market movements
            </p>
            <Button onClick={() => setIsCreateOpen(true)}>
              <Plus weight="bold" className="h-4 w-4 mr-2" />
              Create Alert
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
