/*
  # Create devices and related tables

  1. New Tables
    - `devices`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `ip` (text)
      - `status` (text)
      - `last_checked` (timestamp)
      - `compliance_score` (integer)
      - `location` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `alerts`
      - `id` (uuid, primary key)
      - `title` (text)
      - `message` (text)
      - `type` (text)
      - `is_read` (boolean)
      - `device_id` (uuid, foreign key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `topology_nodes`
      - `id` (uuid, primary key)
      - `name` (text)
      - `type` (text)
      - `status` (text)
      - `x` (integer)
      - `y` (integer)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `topology_links`
      - `id` (uuid, primary key)
      - `source_id` (uuid, foreign key)
      - `target_id` (uuid, foreign key)
      - `status` (text)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create devices table
CREATE TABLE IF NOT EXISTS devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  ip text NOT NULL,
  status text NOT NULL,
  last_checked timestamptz NOT NULL DEFAULT now(),
  compliance_score integer NOT NULL DEFAULT 0,
  location text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE devices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read devices"
  ON devices
  FOR SELECT
  TO authenticated
  USING (true);

-- Create alerts table
CREATE TABLE IF NOT EXISTS alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  message text NOT NULL,
  type text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  device_id uuid REFERENCES devices(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read alerts"
  ON alerts
  FOR SELECT
  TO authenticated
  USING (true);

-- Create topology_nodes table
CREATE TABLE IF NOT EXISTS topology_nodes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  type text NOT NULL,
  status text NOT NULL,
  x integer NOT NULL,
  y integer NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE topology_nodes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read topology nodes"
  ON topology_nodes
  FOR SELECT
  TO authenticated
  USING (true);

-- Create topology_links table
CREATE TABLE IF NOT EXISTS topology_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_id uuid REFERENCES topology_nodes(id) ON DELETE CASCADE,
  target_id uuid REFERENCES topology_nodes(id) ON DELETE CASCADE,
  status text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE topology_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow authenticated users to read topology links"
  ON topology_links
  FOR SELECT
  TO authenticated
  USING (true);

-- Add trigger for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_devices_updated_at
  BEFORE UPDATE ON devices
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_alerts_updated_at
  BEFORE UPDATE ON alerts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_topology_nodes_updated_at
  BEFORE UPDATE ON topology_nodes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_topology_links_updated_at
  BEFORE UPDATE ON topology_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();