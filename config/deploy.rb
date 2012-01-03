set :default_env, 'production'
set :rails_env,    ENV['rails_env'] || ENV['RAILS_ENV'] || default_env
default_run_options[:pty]   = true
ssh_options[:forward_agent] = true

require "bundler/capistrano"
load 'deploy/assets'

set :application, "mdown"
set :user, "julien"
set :use_sudo, false

set :repository,     "git://github.com/ysbaddaden/mdown.git"
set :scm,            "git"
set :scm_username,   "julien"
#set :scm_passphrase, ""
set :branch,         "master"

set :deploy_to,  "/home/www/#{application}"
set :deploy_via, :remote_cache

role :web, "ns306322.ovh.net"
role :app, "ns306322.ovh.net"
role :db,  "ns306322.ovh.net", :primary => true

#after 'deploy:update_code' do
#  run "ln -nfs #{shared_path}/config/database.yml #{release_path}/config/database.yml"
#end

namespace :deploy do
  desc "Starts the thin server"
  task :start do
    run "cd #{current_path} ; bundle exec thin start -C /etc/thin/#{application}.yml"
  end

  desc "Stops the thin server"
  task :stop do
    run "cd #{current_path} ; bundle exec thin stop -C /etc/thin/#{application}.yml"
  end

  desc "Restarts the thin server"
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "cd #{current_path} ; bundle exec thin restart -C /etc/thin/#{application}.yml"
  end
end

